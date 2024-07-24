import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import useSpeech from 'utils/hooks/use-speech';
import { Api } from 'utils/api/api';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function Main() {
  const [serverMessage, setServerMessage] =
    useState<string>('무엇을 도와드릴까요?');

  const {
    transcript: userMessage,
    isListening,
    isSpeaking,
    startListening,
  } = useSpeech({
    delay: 1500,
    language: 'ko-KR',
  });

  useEffect(() => {
    if (!isListening) {
      startListening();
    }
  }, []);

  useEffect(() => {
    if (userMessage && !isSpeaking) {
      console.log('요청!!!!!');
      const fetch = async () => {
        const assistant = await openai.beta.assistants.retrieve(
          import.meta.env.VITE_OPENAI_ASSISTANT_ID
        );
        console.log(assistant);
        const thread = await openai.beta.threads.create({});
        const myThreadMessage = await openai.beta.threads.messages.create(
          thread.id,
          {
            role: 'user',
            content: userMessage,
          }
        );
        console.log(myThreadMessage);
        const myRun = await openai.beta.threads.runs.create(thread.id, {
          assistant_id: assistant.id,
        });
        console.log('This is the run object: ', myRun, '\n');

        let keepRetrievingRun;
        const sendedCallIds: Record<string, boolean> = {};

        while (myRun.status === 'queued' || myRun.status === 'in_progress') {
          keepRetrievingRun = await openai.beta.threads.runs.retrieve(
            thread.id,
            myRun.id
          );
          console.log(`Run status: ${keepRetrievingRun.status}`);

          if (keepRetrievingRun.status === 'completed') {
            console.log('\n');

            // Step 6: Retrieve the Messages added by the Assistant to the Thread
            const allMessages = await openai.beta.threads.messages.list(
              thread.id
            );

            console.log(
              '------------------------------------------------------------ \n'
            );

            // console.log('User: ', myThreadMessage.content[0].type);
            // console.log('Assistant: ', allMessages.data[0].content[0].text);
            if (allMessages.data[0].content[0].type === 'text') {
              setServerMessage(allMessages.data[0].content[0].text.value);
            }

            break;
          } else if (keepRetrievingRun.status === 'requires_action') {
            const requiredActions =
              keepRetrievingRun.required_action?.submit_tool_outputs.tool_calls;
            console.log('Required Actions: ', requiredActions);
            if (!requiredActions) {
              break;
            }
            const returns = await Promise.all(
              requiredActions.map(async (action) => {
                let output = '{success: true}';
                switch (action.function.name) {
                  case 'getMenus':
                    output = JSON.stringify(await Api.getMenus());
                    break;
                }
                return {
                  tool_call_id: action.id,
                  output,
                } as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput;
              })
            );
            await openai.beta.threads.runs.submitToolOutputs(thread.id, myRun.id, {
              tool_outputs: returns,
            });
          } else if (
            keepRetrievingRun.status === 'queued' ||
            keepRetrievingRun.status === 'in_progress'
          ) {
            // pass
            console.log(`Run status: ${keepRetrievingRun.status}`);
          } else {
            console.log(`Run status: ${keepRetrievingRun.status}`);
            console.log(keepRetrievingRun);
            break;
          }
        }
      };
      fetch();
    }
  }, [userMessage, isSpeaking]);

  return (
    <main className="flex flex-col gap-12 px-8">
      <div className="px-4 py-2 rounded-2xl bg-white text-2xl self-start">
        {serverMessage}
      </div>
      <img
        src="/images/server.png"
        className="rounded-full aspect-square w-full"
      />
      <div className="px-4 py-2 rounded-2xl bg-white text-2xl self-end text-lg">
        {userMessage}
        {isSpeaking && '...'}
      </div>
    </main>
  );
}
