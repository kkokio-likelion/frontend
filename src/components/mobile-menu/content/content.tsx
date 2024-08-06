import { useCallback, useEffect, useState } from 'react';
import Card from 'components/modal-page/card';
import Button from './button';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MenuControllerApi,
  Configuration,
  ExtraControllerApi,
} from 'utils/api';
import MenuItem from './menu-item';

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
  const [categoryarray, setCategoryArray] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [totalprice, setTotalPrice] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const [selectedTotalMenu, setSelectedTotalMenu] = useState<Menu[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu>();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.totalMenu) {
      setSelectedTotalMenu(location.state?.totalMenu);
      const count = location.state.totalMenu.reduce(
        (acc: number, item: Menu) => acc + item.count,
        0
      );
      const newPrice = location.state.totalMenu.reduce(
        (acc: number, item: Menu) => acc + item.price,
        0
      );
      setTotalCount((prev) => prev + count);
      setTotalPrice((prev) => prev + newPrice);
    }
  }, [location.state]);

  const navigate = useNavigate();

  useEffect(() => {
    setAllMenu(36);
  }, []);

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
          } as Menu;
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

  const navigateToPurchase = () => {
    navigate('/1/menu/order', { state: { selectedTotalMenu } });
  };

  return (
    <>
      {modal && (
        <Card
          plus={plusMenu}
          modalclick={() => setModal(false)}
          menu={selectedMenu!}
          savemenu={saveMenu}
        />
      )}
      <div className="flex whitespace-nowrap items-start gap-x-3 py-4 px-2.5 overflow-x-auto">
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
      <div className="flex px-4 py-2 items-center justify-center gap-4 overflow-auto">
        <div className="flex flex-wrap px-4 py-2 items-center gap-4 overflow-auto">
          {menu.map((item) =>
            item.categoryName === category ? (
              <MenuItem
                key={item.id}
                menu={item}
                onClick={() => clickMenu(item)}
              />
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      {!modal && (
        <div className="flex flex-col w-dvw p-4 items-start gap-2.5 fixed bottom-0 border-t-1px border-t-[#F0F0F0] bg-white">
          {totalcount === 0 ? (
            <button className="flex p-4 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#F0F0F0] text-xl font-medium leading-tight text-neutral-400">
              주문확인
            </button>
          ) : (
            <>
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
              <button
                onClick={navigateToPurchase}
                className="flex p-4 justify-center items-center gap-2.5 self-stretch rounded-lg bg-[#62BDF0] text-white text-xl font-medium leading-tight"
              >
                주문확인
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
