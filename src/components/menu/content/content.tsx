// Content.tsx
import { SetStateAction, useEffect, useState } from 'react';
import Card from '../card/card';
import Button from './button';
import MenuList from './menuList';
import data from '../../data.json';
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const [menu, setMenu] = useState({});
  const [category, setCateory] = useState(Object.keys(data)[0]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const [selectedMenuName, setSelectedMenuName] = useState("");
  const [selectedMenuPrice, setSelectedMenuPrice] = useState(0);
  const [selectedMenuside, setSelectedMenuSide] = useState([]);
  const [selectedTotalMenu, setSelectedTotalMenu] = useState<any[]>([]); // Change to array

  const navigate= useNavigate();

  useEffect(() => {
    setMenu(data);
  }, []);

  const [modal, setModal] = useState(false);

  const buttonClick = (menu: SetStateAction<string>) => {
    setCateory(menu);
  };

  const menuPlus = (price: number, count: number) => {
    setTotalPrice((prev) => prev + price * count);
    setTotalCount((prev) => prev + count);
  };

  const menuClick = (name: string, price: number, side: any) => {
    setModal(true);
    setSelectedMenuName(name);
    setSelectedMenuPrice(price);
    setSelectedMenuSide(side);
  };

  const saveMenu = (menuDetails: {
    name: string;
    price: number;
    count: number;
    sides: Array<{ name: string; price: number }>;
  }) => {
    setSelectedTotalMenu((prev) => [...prev, menuDetails]);
    console.log(selectedTotalMenu)
  };


  const navigateToPurchase = () => {
    navigate("/menu/order", {state : {selectedTotalMenu}}) ;
  };

  return (
    <>
      {modal && (
        <Card
          plus={menuPlus}
          modalclick={() => setModal(false)}
          menuName={selectedMenuName}
          menuPrice={selectedMenuPrice}
          sidemenu={selectedMenuside}
          savemenu={saveMenu}
        />
      )}
      <div className="flex items-start gap-x-3 py-4 px-2.5 overflow-auto">
        {Object.keys(menu).map((key) =>
          category === key ? (
            <Button key={key} selected={true} onClick={buttonClick}>
              {key}
            </Button>
          ) : (
            <Button selected={false} onClick={buttonClick}>
              {key}
            </Button>
          )
        )}
      </div>
      <div className="flex w-[26.6875rem] py-2 px-4 gap-x-4 gap-y-6 items-center content-center justify-start flex-wrap overflow-auto">
        {data[category].map((item) => (
          <MenuList
            key={item.id}
            menuName={item.name}
            menuPrice={item.price}
            side={item.side}
            MenuClick={() => menuClick(item.name, item.price, item.side)}
          />
        ))}
      </div>
      {!modal && (
        <div className="flex flex-col w-[26.6875rem] p-4 items-start g-[0.625rem] absolute bottom-0 border-t-1px border-t-[#F0F0F0]">
          {totalcount === 0 ? (
            <button className="flex p-4 justify-center items-center g-[0.625rem] self-stretch rounded-lg bg-[#F0F0F0] text-[20px] font-medium leading-[20px] text-neutral-400">
              주문확인
            </button>
          ) : (
            <>
              <div className="flex p-2 justify-between items-start self-stretch">
                <p className="text-[18px] font-medium leading-[18px]">
                  {totalcount}
                </p>
                <p className="text-[#777] text-[18px] font-medium leading-[18px]">
                  개 선택됨
                </p>
                <p className="text-[#777] text-[18px] font-medium leading-[18px]">
                  합계
                </p>
                <p className="text-[#000] text-[18px] font-medium leading-[18px]">
                  {totalprice}원
                </p>
              </div>
              <button onClick={navigateToPurchase} className="flex p-4 justify-center items-center g-[0.625rem] self-stretch rounded-lg bg-[#62BDF0] text-[#FFF] text-[20px] font-medium leading-[20px]">
                주문확인
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
