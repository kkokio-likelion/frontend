import { useLocation } from 'react-router-dom';
import BottomBar from './bottom-bar';
import MenuInfo from './menu-info';
import { Key, useEffect, useState } from 'react';

type Menu = {
  name: string;
  price: number;
  count: number;
  sides: Array<Side>;
};

type Side = {
  name: string;
  price: number;
};

export default function OrderPage({}) {
  const location = useLocation();
  const { selectedTotalMenu } = location.state || {};
  const [totalcount, setTotalCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalCount = 0;
    let totalPrice = 0;
    selectedTotalMenu.forEach((item: Menu) => {
      totalCount += item.count;
      totalPrice += item.price;
    });
    setTotalCount(totalcount);
    setTotalPrice(totalPrice);
  }, [selectedTotalMenu]);

  console.log(selectedTotalMenu);
  return (
    <>
      <div className="w-dvw bg-white flex-col justify-start items-start inline-flex">
        <header className="self-stretch p-4 bg-white shadow justify-center items-start gap-2.5 inline-flex text-[22px] font-medium leading-snug">
          주문서
        </header>
        {selectedTotalMenu.map((item: Menu, index: Key | null | undefined) => (
          <MenuInfo
            key={index}
            name={item.name}
            price={item.price}
            count={item.count}
            side={item.sides}
          ></MenuInfo>
        ))}
      </div>
      <BottomBar price={totalprice} count={totalcount} />
    </>
  );
}
