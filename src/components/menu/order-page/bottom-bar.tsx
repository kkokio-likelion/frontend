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
  price: number;
  count: number;
  selectedTotalMenu:Menu[];
};

export default function BottomBar({ selectedTotalMenu,price, count }: Props) {
  return (
    <>
      <div className="flex w-dvw p-4 flex-col items-start gap-4 absolute bottom-0 border-t bg-white border-[#F0F0F0] z-50">
        <div className="flex p-2 justify-between items-start self-stretch text-gray-500 text-lg font-medium leading-none">
          <span>
            <span className="text-black">{count}</span> 개 선택됨
          </span>
          <span>
            합계 <span className="text-black">{price}원</span>
          </span>
        </div>
        <div className="w-full flex items-start gap-4">
          <Link
            className="flex w-2/5 p-4 justify-center items-center gap-2 rounded-lg border border-[#AAA] text-xl font-medium leading-tight text-black/75"
            to="/menu/menu"
            state={{totalMenu:selectedTotalMenu}}
          >
            더 담기
          </Link>
          <button className="w-0 flex-1 p-3 justify-center items-center gap-2 rounded-lg bg-[#62BDF0] text-white text-xl font-medium leding-tight">
            주문하기
          </button>
        </div>
      </div>
    </>
  );
}
