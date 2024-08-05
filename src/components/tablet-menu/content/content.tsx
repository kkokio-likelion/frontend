import { useCallback, useEffect, useState } from 'react';
import { data } from 'utils/api/dummy-data';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import MenuList from './menu-list';
import Card from 'components/modal-page/card';
import OrderModal from './modal/main-order-modal';
import {
  MenuControllerApi,
  Configuration,
  ExtraControllerApi,
} from 'utils/api';

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL as string,
});

const menuApi = new MenuControllerApi(apiConfig);
const extraApi = new ExtraControllerApi(apiConfig);

type Side = {
  id: number;
  name: string;
  price: number;
};
type Menu = {
  id: number;
  name: string;
  price: number;
  count: number;
  categoryId: number;
  categoryName: string;
  img: string;
  sides: Array<Side>;
};

export default function Content() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [category, setCategory] = useState('');
  const [categoryarray, setCategoryArray] = useState<string[]>([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const [selectedTotalMenu, setSelectedTotalMenu] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const navigate = useNavigate();

  useEffect(() => {
    setAllMenu(36);
  }, []);

  const saveMenuData = (menu: Menu[]) => {
    setSelectedTotalMenu(menu);
    let totalCount = 0;
    let totalPrice = 0;
    menu.forEach((item) => {
      totalCount += item.count;
      totalPrice += item.price;
    });
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  };

  const [modal, setModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  const removeCategory = (categories: string[]) => {
    const uniqueCategories = Array.from(new Set(categories));
    setCategoryArray(uniqueCategories);
  };

  const callExtraMenu = useCallback(async (menuId: number) => {
    const extraMenu = await extraApi.getExtraInfoByMenuId({
      menuId,
      pageable: { page: 0, size: 100 },
    });
    return extraMenu.content;
  }, []);

  const setAllMenu = useCallback(
    async (storeId: number) => {
      const allMenu = await menuApi.getMenuInfoStoreId({
        storeId,
        pageable: { page: 0, size: 100 },
      });

      const menuPromises =
        allMenu.content?.map(async (item) => {
          const menuid = item.menuId;
          const extraMenu = await callExtraMenu(menuid!);

          return {
            id: item.menuId,
            name: item.menuName,
            price: item.menuPrice,
            count: 0,
            img: item.menuImgUrl,
            categoryId: item.categoryDtoOnly?.categoryId,
            categoryName: item.categoryDtoOnly?.categoryName,
            sides: extraMenu?.map((sideItem) => ({
              id: sideItem.extraId,
              name: sideItem.extraName,
              price: sideItem.extraPrice,
            })),
          };
        }) || [];

      const menus = await Promise.all(menuPromises);

      const categories = menus
        .map((menuItem) => menuItem.categoryName)
        .filter((name) => name !== undefined) as string[];
      removeCategory(categories);
      setCategory(categories[0]);
      setMenu(menus);
    },
    [callExtraMenu]
  );

  const clickButton = (menu: string) => {
    setCategory(menu);
  };

  const plusMenu = (price: number, count: number) => {
    setTotalPrice((prev) => prev + price);
    setTotalCount((prev) => prev + count);
  };

  const clickMenu = (menu: Menu) => {
    setModal(true);
    setSelectedMenu(menu);
  };

  const saveMenu = (menuDetails: Menu) => {
    setSelectedTotalMenu((prev) => {
      const existingMenuIndex = prev.findIndex(
        (item) =>
          item.id === menuDetails.id &&
          JSON.stringify(item.sides.map((side) => side.id).sort()) ===
            JSON.stringify(menuDetails.sides.map((side) => side.id).sort())
      );

      if (existingMenuIndex !== -1) {
        const updatedMenus = prev.map((item, index) => {
          if (index === existingMenuIndex) {
            return {
              ...item,
              count: item.count + menuDetails.count,
              price: item.price + menuDetails.price,
            };
          }
          return item;
        });

        return updatedMenus;
      }

      return [...prev, menuDetails];
    });
    console.log(selectedTotalMenu);
  };

  const openOrderModal = () => {
    setOrderModal(true);
  };

  const closeOrderModal = () => {
    setOrderModal(false);
  };

  return (
    <>
      {orderModal && (
        <OrderModal
          saveMenuData={saveMenuData}
          closeOrderModal={closeOrderModal}
          totalMenu={selectedTotalMenu}
        ></OrderModal>
      )}
      {modal && (
        <Card
          plus={plusMenu}
          modalclick={() => setModal(false)}
          menu={selectedMenu!}
          savemenu={saveMenu}
        />
      )}
      <div className="w-dvw h-dvh bg-white justify-start items-start inline-flex">
        <div className="w-80 self-stretch border-r border-[#f0f0f0] flex-col justify-start items-start inline-flex">
          <div className="self-stretch p-4 bg-white shadow justify-center items-start gap-2.5 inline-flex">
            <div className="text-black text-2xl font-medium leading-normal">
              맛도리
            </div>
          </div>
          <div className="self-stretch grow shrink basis-0 px-2.5 py-4 flex-col justify-start items-start flex whitespace-nowrap overflow-y-auto">
            {categoryarray.map((key) => (
              <Button
                key={key}
                selected={category === key}
                onClick={() => clickButton(key)}
                value={key}
              >
                {key}
              </Button>
            ))}
          </div>
          <div className="self-stretch p-4 justify-start items-center gap-2 inline-flex">
            <div className="grow shrink  whitespace-nowrap basis-0  px-6 py-4 bg-[#555555] rounded-lg justify-center items-center gap-2.5 flex">
              <button className="text-white text-lg font-medium leading-none">
                직원호출
              </button>
            </div>
            <div className="whitespace-nowrap grow shrink basis-0  px-6 py-4 bg-white rounded-lg border border-black justify-center items-center gap-2.5 flex">
              <button className="text-[#333333] text-lg font-medium leading-none">
                관리자 로그인
              </button>
            </div>
          </div>
          {!modal && (
            <>
              {totalcount === 0 ? (
                <div className="self-stretch p-4 bg-white border-t border-[#f0f0f0] flex-col justify-start items-start gap-2.5 flex">
                  <div className="self-stretch p-4 bg-[#f0f0f0] rounded-lg justify-center items-center gap-2.5 inline-flex">
                    <button className="text-[#aaaaaa] text-xl font-medium leading-tight">
                      주문확인
                    </button>
                  </div>
                </div>
              ) : (
                <div className="self-stretch p-4 bg-white border-t border-[#f0f0f0] flex-col justify-start items-start gap-2.5 flex">
                  <div className="flex p-2 justify-between items-start self-stretch text-[#777] text-lg font-medium leading-[18px]">
                    <span>
                      <span className="text-black  mr-2">{totalcount}</span>개
                      선택됨
                    </span>
                    <span className="">
                      합계
                      <span className="text-black ml-2">{totalprice}원</span>
                    </span>
                  </div>
                  <div className="self-stretch p-4 bg-[#62BDF0] rounded-lg justify-center items-center gap-2.5 inline-flex">
                    <button
                      onClick={openOrderModal}
                      className="text-white text-xl font-medium leading-tight"
                    >
                      주문확인
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="grow shrink basis-0 self-stretch py-6 flex-col justify-start items-start inline-flex">
          <div className="px-6 justify-center items-center gap-2.5 inline-flex">
            <div className="text-black text-xl font-medium leading-tight">
              {category}
            </div>
          </div>
          <div className="flex-wrap self-stretch p-6 justify-start items-start gap-4 inline-flex overflow-auto">
            {menu.map((item) =>
              item.categoryName === category ? (
                <MenuList
                  key={item.id}
                  menu={item}
                  MenuClick={() => clickMenu(item)}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
