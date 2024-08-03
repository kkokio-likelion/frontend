import { useState } from 'react';
import Minusicon from '../../../assets/icon/minus-icon';
import PlusIcon from '../../../assets/icon/plus-icon';
import Side from './side';

type side = {
  name: string;
  price: number;
};

type Menu = {
  name: string;
  price: number;
  count: number;
  sides: Array<side>;
};

type Props = {
  menuName: string;
  menuPrice: number;
  plus: (totalPrice: number, count: number) => void;
  modalclick: () => void;
  sidemenu: {
    name: string;
    price: number;
  }[];
  savemenu: (menuDetails: Menu) => void;
};

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
  const [checkedside, setCheckedSide] = useState<side[]>([]);

  const plusClick = () => {
    count < 100 && setCount((prev) => prev + 1);
  };

  const checkSide = (checked: boolean, name: string, price: number) => {
    if (checked) {
      setCheckedSide((prev) => [...prev, { name: name, price: price }]);
    } else {
      setCheckedSide((prev) => prev.filter((item) => item.name !== name));
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
    <div onClick={modalclick} className='w-dvw h-dvh bg-black/20  absolute'>
      <div className="fixed bottom-0 w-dvw border-l-4 border-t-4 z-50 p-4 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch py-2 justify-start items-center gap-4 inline-flex">
          <div className="w-[110px] h-[110px] p-1 border justify-start items-center gap-2.5 inline-flex">
            <img
              src="public\images\chicken.webp"
              className="w-[102px] h-[63px]"
            />
          </div>
          <div className="grow shrink basis-0 self-stretch flex-col justify-between items-end inline-flex">
            <p className="self-stretch h-6 text-black text-lg font-medium leading-[18px]">
              {menuName}
            </p>
            <div className="justify-center items-center gap-3 inline-flex">
              <p className="text-center text-black text-lg font-medium leading-[18px]">
                {menuPrice}원
              </p>
              <button
                onClick={minusClick}
                className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black"
              >
                <Minusicon />
              </button>
              <p className="w-8 text-center text-lg font-medium leading-[18px]">
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
        <hr className="w-full h-[0.0625rem] bg-gray-400 border-0" />
        <div className="w-full flex-col justify-start items-start inline-flex">
          {sidemenu.map((item, index) => (
            <Side
              key={index}
              plusSide={plusSide}
              sidename={item.name}
              sideprice={item.price}
              onCheck={checkSide}
            />
          ))}
        </div>
        <button
          onClick={handleSave}
          className="flex w-full p-4 justify-center items-center gap-2.5 rounded-lg bg-[#62BDF0] text-xl font-medium leading-tight text-white"
        >
          {(menuPrice + totalside) * count}원 담기
        </button>
      </div>
    </div>
  );
}
