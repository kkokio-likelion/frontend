import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

type Props = {
  menu: Menu[];
  closeOrderModal: () => void;
  saveMenuData: (Menu: Menu[]) => void;
};

export default function BottomBar({
  menu,
  closeOrderModal,
  saveMenuData,
}: Props) {
  const [totalcount, setTotalCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalCount = 0;
    let totalPrice = 0;
    menu.forEach((item: Menu) => {
      totalCount += item.count;
      totalPrice += item.price;
    });
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  }, [menu]);

  return (
    <>
      <div className="w-full p-4 bg-white border-t border-[#f0f0f0] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch p-2 justify-between items-start inline-flex">
          <div className="h-[18px] justify-start items-center gap-0.5 flex">
            <div className="text-black text-lg font-medium leading-none">
              {totalcount}
            </div>
            <div className="text-[#777777] text-lg font-medium leading-none">
              개 선택됨
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <div className="text-[#777777] text-lg font-medium leading-none">
              합계
            </div>
            <div className="text-black text-lg font-medium leading-none">
              {totalprice}원
            </div>
          </div>
        </div>
        <div className="w-full self-stretch justify-start items-start gap-4 inline-flex">
          <div
            onClick={() => {
              saveMenuData(menu);
              closeOrderModal();
            }}
            className="w-2/5 p-4 rounded-lg border border-[#aaaaaa] justify-center items-center gap-2.5 flex"
          >
            <button className="text-[#555555] text-xl font-medium leading-tight">
              더 담기
            </button>
          </div>
          <div className="flex-1 p-4 bg-[#61bdf0] rounded-lg justify-center items-center gap-2.5 flex">
            <button className="text-white text-xl font-medium leading-tight">
              주문확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
