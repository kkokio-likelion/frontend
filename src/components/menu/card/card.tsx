import { useState } from 'react';
import Minusicon from '../../../assets/icon/minus-icon';
import PlusIcon from '../../../assets/icon/plus-icon';
import Side from './side';

type Props = {
  menuName: string;
  menuPrice: number;
  plus: (totalPrice: number, count: number) => void;
  modalclick: () => void;
  sidemenu: {
    name:string;
    price:number;
  }[];
  savemenu: (menuDetails: {
    name: string;
    price: number;
    count: number;
    sides: Array<{ name: string; price: number }>;
  }) => void;
};

interface SideItem {
  name: string;
  price: number;
}

export default function Card({
  plus,
  menuName,
  menuPrice,
  modalclick,
  sidemenu,
  savemenu,
}: Props) {
  const [count, setCount] = useState(1);
  const [totalside, setTotalSide] = useState(0);
  const [checkedside, setCheckedSide] = useState<SideItem[]>([]);

  const plusClick = () => {
    count < 100 && setCount((prev) => prev + 1);
  };

  const checkSide = (checked: boolean, sidename: string, sideprice: number) => {
    if (checked) {
      setCheckedSide((prev) => [...prev, { name: sidename, price: sideprice }]);
    } else {
      setCheckedSide((prev) => prev.filter((item) => item.name !== sidename));
    }
    console.log(checkedside);
  };

  const minusClick = () => {
    count > 1 && setCount((prev) => prev - 1);
  };

  const plusSide = (sideprice: number) => {
    setTotalSide((prev) => prev + sideprice);
  };

  const handleSave = () => {
    const totalPrice = (menuPrice + totalside) * count;
    plus(totalPrice, count);
    savemenu({
      name: menuName,
      price: totalPrice,
      count,
      sides: checkedside,
    });
    modalclick();
  };

  return (
    <div className="flex flex-col g-4 absolute bottom-0 items-start w-[25.6875rem] p-4 border-l-4 border-t-4 z-50">
      <div className="flex py-2 px-0 items-center g-4 self-stretch">
        <div className="w-[6.875rem] h-[6.875rem] p-1 items-center g-[0.625rem]">
          <image className="w-[6.375rem] h-[3.9375rem] flex-shrink-0"></image>
        </div>
        <div className="flex flex-col justify-between items-end flex-[1_0_0] self-stretch">
          <p className="self-stretch text-[1.125rem] font-medium leading-[1.125rem]">
            {menuName}
          </p>
          <p>{(menuPrice + totalside) * count}원</p>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={minusClick}
              className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black"
            >
              <Minusicon />
            </button>
            <p className="text-center font-noto text-lg font-medium leading-[1.125rem]">
              {count}
            </p>
            <button
              onClick={plusClick}
              className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
      <hr className="w-[24.6875rem] h-[0.0625rem] bg-gray-400 border-0" />
      {sidemenu.map((item, index) => (
        <div className="flex flex-col items-start self-stretch" key={index}>
          <Side
            plusSide={plusSide}
            sidename={item.name}
            sideprice={item.price}
            menucheck={checkSide}
          />
        </div>
      ))}
      <button
        onClick={handleSave}
        className="flex w-[24.6875rem] p-4 justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-[#62BDF0] text-[1.25rem] font-medium leading-5 text-white"
      >
        담기
      </button>
    </div>
  );
}
