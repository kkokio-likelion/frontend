import { useLocation } from 'react-router-dom';
import BottomBar from './bottom-bar';
import MenuInfo from './menu-info';
import { Key, useEffect, useState } from 'react';
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


export default function OrderPage({}) {
  const location = useLocation();
  const { selectedTotalMenu = [] } = location.state || {}; 
  const [menuList, setMenuList] = useState<Menu[]>(selectedTotalMenu);
  const [totalcount, setTotalCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalCount = 0;
    let totalPrice = 0;
    menuList.forEach((item: Menu) => {
      totalCount += item.count;
      totalPrice += item.price;
    });
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  }, [menuList]);

  const minusMenu =(menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.map((menu) => {
        if (
          menu.count>1 &&
          menu.id === menuId &&
          JSON.stringify(menu.sides.map((side) => side.id).sort()) === JSON.stringify(sideIds.sort())
        ) {
          return { ...menu, count: menu.count - 1 , price:menu.price - (menu.price/menu.count)};
        }
        return menu;
      });

      return updatedList;
    });
  }

  const plusMenu =(menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.map((menu) => {
        if (
          menu.id === menuId &&
          JSON.stringify(menu.sides.map((side) => side.id).sort()) === JSON.stringify(sideIds.sort())
        ) {
          return { ...menu, count: menu.count + 1 , price:menu.price + (menu.price/menu.count)}
        }
        return menu;
      });

      return updatedList;
    });
  }

  const deleteMenu = (menuId: number, sideIds: number[]) => {
    setMenuList((prevList) => {
      const updatedList = prevList.filter((menu) => 
        !(menu.id === menuId && JSON.stringify(menu.sides.map((side) => side.id).sort()) === JSON.stringify(sideIds.sort()))
      );

      return updatedList;
    });
  };

  return (
    <>
      <div className="w-dvw bg-white flex-col justify-start items-start inline-flex">
        <header className="self-stretch p-4 bg-white shadow justify-center items-start gap-2.5 inline-flex text-[22px] font-medium leading-snug">
          주문서
        </header>
        {menuList.map((item: Menu) => (
          <MenuInfo
            key={item.id}
            menu={item}
            minusMenu={() => minusMenu(item.id, item.sides.map(side => side.id))}
            plusMenu={() => plusMenu(item.id, item.sides.map(side => side.id))}
            deleteMenu={() => deleteMenu(item.id, item.sides.map(side => side.id))}
          />
        ))}
      </div>
      <BottomBar selectedTotalMenu={menuList} price={totalprice} count={totalcount} />
    </>
  );
}
