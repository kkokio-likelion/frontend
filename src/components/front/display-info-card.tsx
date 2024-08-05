import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import {
  CategoryControllerApi,
  Configuration,
  ExtraControllerApi,
  MenuControllerApi,
} from 'utils/api';
import { OrderAssistantDisplayAction } from 'utils/hooks/use-order-assistant';
import MenuItem from './display-info-card/menu-item';
import SideItem from './display-info-card/side-item';
import { numberWithCommas } from 'utils/functions';
import { MenuType } from 'utils/hooks/use-order-cart';

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL as string,
});
const categoryApi = new CategoryControllerApi(apiConfig);
const menuApi = new MenuControllerApi(apiConfig);
const extraApi = new ExtraControllerApi(apiConfig);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export type Props = {
  storeId: number;
  state: OrderAssistantDisplayAction;
  onInteract: (msg: string) => void;
  menus: MenuType[];
};

export default function DisplayInfoCard({
  storeId,
  state,
  onInteract,
  menus,
}: Props) {
  const [content, setContent] = useState<ReactNode>(
    <div className="flex flex-col gap-6 items-center w-full pt-8 text-2xl font-medium">
      <div className="text-xl font-normal">이렇게 주문해보세요.</div>
      <div>"무슨 메뉴 있어요?"</div>
      <div>"~~ 메뉴 하나 주세요"</div>
    </div>
  );
  const [popup, setPopup] = useState<{ content: ReactNode; duration: number }>({
    content: <></>,
    duration: 0,
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);
  useEffect(() => {
    if (popup.duration === 0) {
      setShowPopup(false);
      return;
    }
    setShowPopup(true);
    if (popup.duration > 0) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, popup.duration * 1000);
      return () => clearTimeout(timer);
    }
    return;
  }, [popup]);

  const controls = useAnimationControls();
  useEffect(() => {
    controls.start('show');
  }, [content, controls]);

  const fetch = async (state: OrderAssistantDisplayAction) => {
    switch (state.state) {
      case 'LIST_CATEGORY': {
        try {
          const res = await categoryApi.getCategoryInfo1({
            storeId,
            pageable: { page: 0, size: 100 },
          });
          if (!res.content) {
            break;
          }
          const content = (
            <div className="flex flex-col">
              <h2 className="w-full text-center py-2 text-xl">
                카테고리를 고르세요
              </h2>
              <ul className="flex flex-col w-full">
                {res.content?.map((category) => (
                  <li
                    key={category.categoryId}
                    className="cursor-pointer px-8 font-medium text-xl [&>div]:border-b [&:last-child>div]:border-none"
                    onClick={() =>
                      category.categoryName && onInteract(category.categoryName)
                    }
                  >
                    <div className="py-4">{category.categoryName}</div>
                  </li>
                ))}
              </ul>
            </div>
          );
          setContent(content);
          setShowPopup(false);
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'LIST_MENU': {
        try {
          const res = state.category_id
            ? await menuApi.getMenuInfoStoreIdAndcategoryId({
                storeId,
                categoryId: state.category_id,
                pageable: { page: 0, size: 100 },
              })
            : await menuApi.getMenuInfoStoreId({
                storeId,
                pageable: { page: 0, size: 100 },
              });
          if (!res.content) {
            break;
          }
          const content = (
            <div className="flex flex-col h-full">
              <motion.ul
                variants={container}
                initial="hidden"
                animate={controls}
                className="px-4 py-4 gap-4 gap-y-5 flex flex-row flex-wrap w-full overflow-y-scroll scrollbar-none"
              >
                {res.content?.map((menu) => (
                  <MenuItem
                    key={menu.menuId}
                    menuName={menu.menuName!}
                    menuPrice={menu.menuPrice!}
                    imageUrl={menu.menuImgUrl}
                    onClick={() =>
                      menu.menuName &&
                      onInteract(`${menu.menuName} 하나 주세요`)
                    }
                  />
                ))}
              </motion.ul>
            </div>
          );
          setContent(content);
          setShowPopup(false);
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'MENU_DETAILS': {
        try {
          const menuRes = await menuApi.getMenuInfo({
            menuId: state.menu_id!,
          });
          if (!menuRes.menuId) {
            break;
          }
          const extraRes = await extraApi.getExtraInfoByMenuId({
            menuId: state.menu_id!,
            pageable: { page: 0, size: 100 },
          });
          const popup = (
            <>
              <div className="p-4 flex flex-row gap-3 w-full border-b">
                <div className="border border-gray-300 flex justify-center items-center gap-2.5 w-24 h-24">
                  <img
                    src={menuRes.menuImgUrl}
                    alt={`${menuRes.menuName} 이미지`}
                    className="w-[85%] h-[85%] object-cover"
                  />
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-1 flex">
                  <p className="self-stretch text-lg font-medium leading-snug">
                    {menuRes.menuName}
                  </p>
                  <p className="self-stretch text-base font-normal leading-none">
                    {numberWithCommas(menuRes.menuPrice || 0)}원
                  </p>
                </div>
              </div>
              <ul className="py-2 flex flex-col flex-wrap w-full overflow-y-scroll scrollbar-none">
                {extraRes.content?.map((extra) => (
                  <SideItem
                    key={extra.extraId}
                    menuName={extra.extraName!}
                    menuPrice={extra.extraPrice!}
                    onClick={() =>
                      extra.extraName && onInteract(`${extra.extraName}`)
                    }
                  />
                ))}
              </ul>
            </>
          );
          setTimeout(() => {
            setPopup({ content: popup, duration: -1 });
          }, 1000);
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'ADDED_MENU': {
        try {
          const popup = (
            <div className="p-4 flex flex-row justify-center border-b text-xl font-medium">
              {state.added_menus.length}개의 메뉴가 추가되었습니다
            </div>
          );
          setTimeout(() => {
            setPopup({ content: popup, duration: 2 });
          }, 100);
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'ORDER_COMPLETED':
        setTimeout(() => {
          setPopup({
            content: (
              <div className="py-4 w-full h-full flex flex-col justify-center items-center">
                <span className="text-xl">대기 번호</span>
                <span className="text-7xl">{state.order_id}</span>
                <span className="text-xl py-2">주문이 완료되었습니다</span>
              </div>
            ),
            duration: 30,
          });
        }, 1000);
      case 'SHOW_ORDERS': {
        try {
          const menuRes = await menuApi.getMenuInfoStoreId({
            storeId,
            pageable: { page: 0, size: 100 },
          });
          const content = await Promise.all(
            menus.map(async (_menu) => {
              const menu = menuRes.content?.find((m) => m.menuId === _menu.id);
              if (!menu) {
                return <></>;
              }
              const extraRes = await extraApi.getExtraInfoByMenuId({
                menuId: menu.menuId!,
                pageable: { page: 0, size: 100 },
              });
              return (
                <li className="list-none">
                  <div className="p-4 flex flex-row gap-3 w-full border-b">
                    <div className="border border-gray-300 flex justify-center items-center gap-2.5 w-16 h-16">
                      <img
                        src={menu.menuImgUrl}
                        alt={`${menu.menuName} 이미지`}
                        className="w-[85%] h-[85%] object-cover"
                      />
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-1 flex flex-1 w-0">
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col">
                          <p className="self-stretch text-lg font-medium leading-snug">
                            {menu.menuName}&nbsp;
                            <span>x{_menu.count}</span>
                          </p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <span className="font-medium">
                            {numberWithCommas(
                              (menu.menuPrice || 0) * _menu.count +
                                (_menu.sides?.reduce((accm, side) => {
                                  const extra = extraRes.content?.find(
                                    (extra) => extra.extraId === side
                                  );
                                  return (extra?.extraPrice! || 0) + accm;
                                }, 0) || 0)
                            )}
                            원
                          </span>
                        </div>
                      </div>
                      <ul className="py-2 flex flex-col flex-wrap w-full overflow-y-scroll scrollbar-none">
                        {_menu.sides?.map((side) => {
                          const extra = extraRes.content?.find(
                            (extra) => extra.extraId === side
                          );
                          if (!extra) {
                            return <></>;
                          }
                          return (
                            <span>
                              ㄴ
                              <span className="font-normal">
                                {extra?.extraName!}
                              </span>
                              &nbsp;
                              <span className="font-medium">
                                {numberWithCommas(extra?.extraPrice!)}원
                              </span>
                            </span>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })
          );
          setContent(content);
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'NO_ACTION':
        setContent(<></>);
        break;
    }
  };
  useEffect(() => {
    console.log(state);
    fetch(state);
  }, [state, menus]);

  return (
    <>
      {content}
      <AnimatePresence>
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full px-4 flex justify-center items-center z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, top: -10 }}
              animate={{ opacity: 1, top: 0 }}
              exit={{ opacity: 0, top: 10 }}
              className="flex flex-col w-full bg-white rounded-2xl shadow-[0_0_16px_0_rgba(0,0,0,0.1)] pointer-events-auto relative border border-gray-300"
            >
              {popup.content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
