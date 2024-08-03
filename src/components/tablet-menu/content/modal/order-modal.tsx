import { Key, useEffect, useState } from 'react';
import MenuInfo from './menu-info';
import BottomBar from './bottom-bar';

type Side = {
  name: string;
  price: number;
};

type Menu = {
  name: string;
  price: number;
  count: number;
  sides: Array<Side>;
};

type Props = {
  totalMenu: Menu[];
  closeOrderModal: () => void;
};
export default function OrderModal({ totalMenu, closeOrderModal }: Props) {
  const [totalcount, setTotalCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalCount = 0;
    let totalPrice = 0;
    totalMenu.forEach((item: Menu) => {
      totalCount += item.count;
      totalPrice += item.price;
    });
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  }, [totalMenu]);

  return (
    <>
      <div className="w-dvw h-dvh bg-black/20 absolute"></div>
      <div className="w-2/6 h-dvh absolute right-0 bg-white flex-col justify-start items-start inline-flex">
        <div className="self-stretch p-4 bg-white shadow justify-start items-center gap-2.5 inline-flex">
          <div className="text-black text-[28px] font-medium leading-7">
            주문서
          </div>
        </div>
        {totalMenu.map((item: Menu, index: Key | null | undefined) => (
          <MenuInfo
            key={index}
            name={item.name}
            price={item.price}
            count={item.count}
            side={item.sides}
          ></MenuInfo>
        ))}
        <BottomBar
          closeOrderModal={closeOrderModal}
          price={totalprice}
          count={totalcount}
        />
      </div>
    </>
  );
}
