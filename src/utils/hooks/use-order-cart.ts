import { useState } from 'react';

export type MenuType = {
  id: number;
  count: number;
  sides: SideType[];
};

export type SideType = number;

export default function useOrderCart() {
  const [menus, setMenus] = useState<MenuType[]>([]);

  const addMenu = (menuId: number, count: number, sideIds: number[]) => {
    const newMenu = { id: menuId, count, sides: sideIds } as MenuType;
    setMenus((prev) => [...prev.filter((menu) => menu.id !== menuId), newMenu]);
    return newMenu;
  };

  const removeMenu = (menuId: number) => {
    const deletedMenu = menus.find((menu) => menu.id == menuId);
    setMenus((prev) => [...prev.filter((menu) => menu.id !== menuId)]);
    return deletedMenu;
  };

  return {
    menus,
    addMenu,
    removeMenu,
  };
}
