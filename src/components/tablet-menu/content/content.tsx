import { useEffect, useState } from 'react';
import { data } from 'utils/api/dummy-data';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import MenuList from './menu-list';

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
      <div className="w-dvw h-dvh bg-white justify-start items-start inline-flex">
        <div className="w-80 self-stretch border-r border-[#f0f0f0] flex-col justify-start items-start inline-flex">
          <div className="self-stretch p-4 bg-white shadow justify-center items-start gap-2.5 inline-flex">
            <div className="text-black text-2xl font-medium leading-normal">
              맛도리
            </div>
          </div>
          <div className="self-stretch grow shrink basis-0 px-2.5 py-4 flex-col justify-start items-start flex">
            {Object.keys(menu).map((key) =>
              category === key ? (
                <Button
                  key={key}
                  selected={true}
                  onClick={clickButton}
                  value={key}
                >
                  {key}
                </Button>
              ) : (
                <Button selected={false} onClick={clickButton} value={key}>
                  {key}
                </Button>
              )
            )}
          </div>
          <div className="self-stretch p-4 justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 h-[50px] px-6 py-4 bg-[#555555] rounded-lg justify-center items-center gap-2.5 flex">
              <button className="text-white text-lg font-medium leading-none">
                직원호출
              </button>
            </div>
            <div className="grow shrink basis-0 h-[50px] px-6 py-4 bg-white rounded-lg border border-black justify-center items-center gap-2.5 flex">
              <button className="text-[#333333] text-lg font-medium leading-none">
                관리자 로그인
              </button>
            </div>
          </div>
          <div className="self-stretch h-[84px] p-4 bg-white border-t border-[#f0f0f0] flex-col justify-start items-start gap-2.5 flex">
            <div className="self-stretch p-4 bg-[#f0f0f0] rounded-lg justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#aaaaaa] text-xl font-medium leading-tight">
                주문확인
              </div>
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch py-6 flex-col justify-start items-start inline-flex">
          <div className="px-6 justify-center items-center gap-2.5 inline-flex">
            <div className="text-black text-xl font-medium leading-tight">
              {category}
            </div>
          </div>
          <div className="self-stretch p-6 justify-start items-start gap-4 inline-flex">
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
        </div>
      </div>
    </>
  );
}
