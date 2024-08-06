import { Key, useState } from 'react';
import MenuItem from './menu-item';
import BottomBar from './bottom-bar';
import { motion } from 'framer-motion';

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

type Props = {
  totalMenu: Menu[];
  closeOrderModal: () => void;
  saveMenuData: (Menu: Menu[]) => void;
};

export default function OrderModal({
  totalMenu,
  saveMenuData,
  closeOrderModal,
}: Props) {
  const [menuList, setMenuList] = useState<Menu[]>(totalMenu);

  const minusMenu = (menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.map((menu) => {
        if (
          menu.count > 1 &&
          menu.id === menuId &&
          JSON.stringify(menu.sides.map((side) => side.id).sort()) ===
            JSON.stringify(sideIds.sort())
        ) {
          return {
            ...menu,
            count: menu.count - 1,
            price: menu.price - menu.price / menu.count,
          };
        }
        return menu;
      });

      return updatedList;
    });
  };

  const plusMenu = (menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.map((menu) => {
        if (
          menu.id === menuId &&
          JSON.stringify(menu.sides.map((side) => side.id).sort()) ===
            JSON.stringify(sideIds.sort())
        ) {
          return {
            ...menu,
            count: menu.count + 1,
            price: menu.price + menu.price / menu.count,
          };
        }
        return menu;
      });

      return updatedList;
    });
  };

  const deleteMenu = (menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.filter(
        (menu) =>
          !(
            menu.id === menuId &&
            JSON.stringify(menu.sides.map((side) => side.id).sort()) ===
              JSON.stringify(sideIds.sort())
          )
      );

      return updatedList;
    });
  };

  return (
    <>
      <div className="w-dvw h-dvh bg-black/20 absolute"></div>
      <div className="w-2/6 h-dvh absolute right-0 bg-white flex-col justify-start items-start inline-flex">
        <div className="self-stretch p-4 bg-white shadow justify-start items-center gap-2.5 inline-flex">
          <div className="text-black text-[28px] font-medium leading-7">
            주문서
          </div>
        </div>
        {menuList.map((item: Menu, index: Key | null | undefined) => (
          <MenuItem
            key={index}
            menu={item}
            minusMenu={minusMenu}
            plusMenu={plusMenu}
            deleteMenu={deleteMenu}
          />
        ))}
        <BottomBar
          closeOrderModal={closeOrderModal}
          saveMenuData={saveMenuData}
          menu={menuList}
        />
      </div>
    </>
  );
}
