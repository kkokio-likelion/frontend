import { useNavigate } from 'react-router-dom';

type Props = {
  price: number;
  count: number;
};

export default function BottomBar({ price, count }: Props) {
  const navigate = useNavigate();

  const navigateToMenu = () => {
    navigate('/menu');
  };

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
        <div className="w-dvw flex items-start gap-4">
          <button
            onClick={navigateToMenu}
            className="flex w-2/5 p-4 justify-center items-center gap-2 rounded-lg border border-[#AAA] leading-tight"
          >
            더 담기
          </button>
          <button className="flex w-3/5 p-3 justify-center items-center gap-2 rounded-lg bg-[#62BDF0] text-white text-xl font-medium leding-tight">
            주문하기
          </button>
        </div>
      </div>
    </>
  );
}
