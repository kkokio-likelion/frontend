import { Link } from 'react-router-dom';

type Props = {
  price: number;
  count: number;
  closeOrderModal: () => void;
};

export default function BottomBar({ price, count, closeOrderModal }: Props) {
  return (
    <>
      <div className="w-full p-4 bg-white border-t border-[#f0f0f0] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch p-2 justify-between items-start inline-flex">
          <div className="h-[18px] justify-start items-center gap-0.5 flex">
            <div className="text-black text-lg font-medium leading-none">
              {count}
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
              {price}원
            </div>
          </div>
        </div>
        <div className="w-full self-stretch justify-start items-start gap-4 inline-flex">
          <div
            onClick={closeOrderModal}
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
