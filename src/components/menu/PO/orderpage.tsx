import { useLocation } from 'react-router-dom';
import BottomBar from './bottombar';
import OptionItem from './optionitem';
import OrderItem from './orderitem';
import MenuInfo from './menuinfo';
import { useEffect, useState } from 'react';

export default function OrderPage({}) {
  const location = useLocation();
  const { selectedTotalMenu } = location.state || {};
  const [totalnum, setTotalNum] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalNum = 0;
    let totalPrice = 0;
    selectedTotalMenu.forEach((item) => {
      totalNum += item.count;
      totalPrice += item.price * item.count;
    });
    setTotalNum(totalNum);
    setTotalPrice(totalPrice);
  }, [selectedTotalMenu]);

  console.log(selectedTotalMenu);
  return (
    <>
      <div className="flex flex-col items-start w-dvw">
        <header className="flex p-4 justify-center items-start gap-2.5 self-stretch bg-white shadow text-[22px] font-medium leading-snug">
          주문서
        </header>
        <div className="flex-1 overflow-auto w-full">
          {selectedTotalMenu.map((item, index) => (
            <div key={index}>
              <MenuInfo
                name={item.name}
                price={item.price * item.count}
                count={item.count}
                side={item.sides}
              ></MenuInfo>
            </div>
          ))}
        </div>
        <BottomBar price={totalprice} count={totalnum} />
      </div>
    </>
  );
}
