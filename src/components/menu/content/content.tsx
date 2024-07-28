// Content.tsx
import { useEffect, useState } from 'react';
import Card from './card';
import Button from './button';
import MenuList from './menu-list';
import { data } from 'utils/api/dummy-data';
import { useNavigate } from 'react-router-dom';

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
export default function Content() {
  const [menu, setMenu] = useState({});
  const [category, setCateory] = useState(Object.keys(data)[0]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalcount, setTotalCount] = useState(0);
  const [selectedMenuName, setSelectedMenuName] = useState('');
  const [selectedMenuPrice, setSelectedMenuPrice] = useState(0);
  const [selectedMenuside, setSelectedMenuSide] = useState<Side[]>([]);
  const [selectedTotalMenu, setSelectedTotalMenu] = useState<Menu[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setMenu(data);
  }, []);

  const [modal, setModal] = useState(false);

  const clickButton = (menu: string) => {
    setCateory(menu);
  };

  const plusMenu = (price: number, count: number) => {
    setTotalPrice((prev) => prev + price);
    setTotalCount((prev) => prev + count);
  };

  const clickMenu = (name: string, price: number, side: Array<Side>) => {
    setModal(true);
    setSelectedMenuName(name);
    setSelectedMenuPrice(price);
    setSelectedMenuSide(side);
  };

  const saveMenu = (menuDetails: Menu) => {
    setSelectedTotalMenu((prev) => [...prev, menuDetails]);
    console.log(selectedTotalMenu);
  };

  const navigateToPurchase = () => {
    navigate('/menu/order', { state: { selectedTotalMenu } });
  };

  return (
    <>
      {modal && (
        <Card
          plus={plusMenu}
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
            <Button key={key} selected={true} onClick={clickButton} value={key}>
              {key}
            </Button>
          ) : (
            <Button selected={false} onClick={clickButton} value={key}>
              {key}
            </Button>
          )
        )}
      </div>
      <div className="px-4 py-2 items-center justify-center inline-flex gap-4 overflow-auto">
        {data[category].map((item) => (
          <MenuList
            key={item.id}
            menuName={item.name}
            menuPrice={item.price}
            side={item.side}
            MenuClick={() => clickMenu(item.name, item.price, item.side)}
          />
        ))}
      </div>
      {!modal && (
        <div className="flex flex-col w-dvw p-4 items-start gap-2.5 absolute bottom-0 border-t-1px border-t-[#F0F0F0]">
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
