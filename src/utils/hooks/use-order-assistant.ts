import { useCallback, useState } from 'react';
import OpenAI from 'openai';
import {
  CategoryControllerApi,
  Configuration,
  ExtraControllerApi,
  MenuControllerApi,
  OrderControllerApi,
  StoreControllerApi,
} from 'utils/api';
import useOrderCart from './use-order-cart';

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL as string,
});
const storeApi = new StoreControllerApi(apiConfig);
const categoryApi = new CategoryControllerApi(apiConfig);
const menuApi = new MenuControllerApi(apiConfig);
const orderApi = new OrderControllerApi(apiConfig);
const extraApi = new ExtraControllerApi(apiConfig);

export type OrderAssistantDisplayAction = {
  state: OrderAssistantDisplayActionState;
  category_id: number | null;
  menu_id: number | null;
  order_id: number | null;
};

export type OrderAssistantResponse = {
  voice_message: string;
  text_message: string;
  display_action: OrderAssistantDisplayAction;
  called_function_name: FunctionName[];
};

export type OrderAssistantDisplayActionState =
  | 'INITIAL'
  | 'LIST_CATEGORY'
  | 'LIST_MENU'
  | 'MENU_DETAILS'
  | 'ADDED_MENU'
  | 'SHOW_ORDERS'
  | 'ORDER_COMPLETED'
  | 'NO_ACTION';

export type FunctionName =
  | 'getCategory'
  | 'getMenus'
  | 'getMenusByCategory'
  | 'addMenuOrder'
  | 'editMenuOrder'
  | 'removeMenuOrder'
  | 'submitOrder'
  | 'getExtraOptionByMenuId';

const assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID;
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function useOrderAssistant(storeId: number) {
  const [status, setStatus] =
    useState<OpenAI.Beta.Threads.Runs.RunStatus>('queued');
  const [thread, setThread] = useState<OpenAI.Beta.Threads.Thread>();
  const [assistant, setAssistant] =
    useState<OpenAI.Beta.Assistants.Assistant>();
  const { menus, addMenu, removeMenu } = useOrderCart();

  const initAssistant = useCallback(async () => {
    const _assistant = await openai.beta.assistants.retrieve(assistantId);
    const _thread = await openai.beta.threads.create({});
    setAssistant(_assistant);
    setThread(_thread);
  }, [assistant, thread]);

  const handleFunctionRequest = useCallback(
    async (functionName: FunctionName, args: string): Promise<string> => {
      switch (functionName) {
        case 'getCategory':
          return JSON.stringify(
            await categoryApi.getCategoryInfo1({
              storeId,
              pageable: { page: 0, size: 100 },
            })
          );
        case 'getMenusByCategory': {
          const { categoryId } = JSON.parse(args) as { categoryId: number };
          return JSON.stringify(
            await menuApi.getMenuInfoStoreIdAndcategoryId({
              storeId,
              categoryId,
              pageable: { page: 0, size: 100 },
            })
          );
        }
        case 'getMenus':
          return JSON.stringify(
            await menuApi.getMenuInfoStoreId({
              storeId,
              pageable: { page: 0, size: 100 },
            })
          );
        case 'getExtraOptionByMenuId':
          const { menuId } = JSON.parse(args) as { menuId: number };
          return JSON.stringify(
            await extraApi.getExtraInfoByMenuId({
              menuId,
              pageable: { page: 0, size: 100 },
            })
          );
        case 'submitOrder':
          const res = await orderApi.createOrderInfo({
            storeId,
            orderInfoRequestDTO: menus.map((menu) => ({
              menuId: menu.id,
              amount: menu.count,
            })),
          });
          return JSON.stringify(res);
        case 'addMenuOrder': {
          const { menuId, count, sideIds } = JSON.parse(args);
          addMenu(menuId, count, sideIds);
          return JSON.stringify(menus);
        }
        case 'editMenuOrder': {
          const { menuId, count, sideIds } = JSON.parse(args);
          const result = addMenu(menuId, count, sideIds);
          return JSON.stringify(result);
        }
        case 'removeMenuOrder': {
          const { menuId } = JSON.parse(args);
          const result = removeMenu(menuId);
          return JSON.stringify(result);
        }
        default:
          return '{success: true}';
      }
    },
    []
  );

  const handleThread = useCallback(
    async (
      run: OpenAI.Beta.Threads.Runs.Run
    ): Promise<OrderAssistantResponse | null> => {
      if (!thread || !assistant) {
        return null;
      }

      while (run.status === 'queued' || run.status === 'in_progress') {
        const keepRetrievingRun = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id
        );
        console.log(`Run status: ${keepRetrievingRun.status}`);
        setStatus(keepRetrievingRun.status);

        switch (keepRetrievingRun.status) {
          case 'completed': // 응답 완료
            const allMessages = await openai.beta.threads.messages.list(
              thread.id
            );

            if (allMessages.data[0].content[0].type === 'text') {
              const response = allMessages.data[0].content[0].text.value;
              const parsed = JSON.parse(response) as OrderAssistantResponse;
              return parsed;
            } else {
              console.log('알 수 없는 응답');
              console.log(allMessages.data);
              return null;
            }

          case 'requires_action': // 함수 요청
            const requiredActions =
              keepRetrievingRun.required_action?.submit_tool_outputs.tool_calls;
            console.log('Required Actions: ', requiredActions);
            if (!requiredActions) {
              return null;
            }
            const returns = await Promise.all(
              requiredActions.map(async (action) => {
                let output = await handleFunctionRequest(
                  action.function.name as FunctionName,
                  action.function.arguments
                );
                return {
                  tool_call_id: action.id,
                  output,
                } as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput;
              })
            );
            await openai.beta.threads.runs.submitToolOutputs(
              thread.id,
              run.id,
              {
                tool_outputs: returns,
              }
            );
            break;

          case 'queued':
          case 'in_progress': // 처리 중
            break;

          default: // 예외
            console.warn('알 수 없는 상태: ' + keepRetrievingRun);
            return null;
        }
      }
      return null;
    },
    [thread, assistant]
  );

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!thread || !assistant) {
        return;
      }
      const threadMessage = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: 'user',
          content: userMessage,
        }
      );
      console.log(threadMessage);
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
        response_format: { type: 'json_object' },
      });
      console.log('This is the run object: ', run, '\n');
      return run;
    },
    [thread, assistant]
  );

  return { status, menus, initAssistant, sendMessage, handleThread };
}
