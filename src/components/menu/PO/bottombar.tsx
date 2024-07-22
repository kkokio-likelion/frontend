import { useNavigate } from 'react-router-dom';

type Props = {
  price: number;
  count: number;
};


export default function BottomBar({price,count}:Props) {
  const navigate= useNavigate();

  const navigateToMenu = () => {
    navigate("/menu");
  };

  return (
    <>
      <div className="flex w-[411px] p-4 flex-col items-start gap-4 absolute bottom-0 border-t bg-white border-[#F0F0F0] z-50">
        <div className="flex p-2 justify-between items-start self-stretch ">
          <p className="text-[18px] font-medium leading-[18px]">{count}</p>
          <p className="text-[#777] text-[18px] font-medium leading-[18px]">
            개 선택됨
          </p>
          <p className="text-[#777] text-[18px] font-medium leading-[18px]">
            합계
          </p>
          <p className="text-[#000] text-[18px] font-medium leading-[18px]">
            {price}원
          </p>
        </div>
        <div className="flex items-start gap-4">
          <button onClick={navigateToMenu} className="flex w-[121px] p-4 justify-center items-center gap-2 rounded-[8px] border border-[#AAA]">
            더 담기
          </button>
          <button className="flex w-[242px] p-4 justify-center items-center gap-2 rounded-[8px] bg-[#62BDF0] text-[#FFF] text-[20px] font-medium leading-[20px]">
            {' '}
            주문확인
          </button>
        </div>
      </div>
    </>
  );
}
