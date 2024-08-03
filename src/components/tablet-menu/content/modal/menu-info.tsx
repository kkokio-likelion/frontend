import Minusicon from '../../../../assets/icon/minus-icon';
import PlusIcon from '../../../../assets/icon/plus-icon';

type Side = {
  name: string;
  price: number;
};

type Props = {
  name: string;
  price: number;
  count: number;
  side: Array<Side>;
};

export default function MenuInfo({ name, price, count, side }: Props) {
  return (
    <>
      <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
        <div className="self-stretch p-4 border-b border-[#f0f0f0] flex-col justify-center items-start gap-4 flex">
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch py-1 justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-black text-2xl font-medium leading-normal">
                {name}
              </div>
            </div>
            <div className="justify-start py-1 items-center inline-flex">
              {side.map((item, index) => (
                <div
                  key={index}
                  className="grow shrink whitespace-nowrap basis-0 text-[#555555] text-base font-medium leading-none"
                >
                  {index === 0 ? item.name + ',' : item.name}
                </div>
              ))}
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="justify-center items-center gap-4 flex">
                <div className="w-8 h-8 rounded-[5px] border border-black flex-col justify-center items-center inline-flex">
                  <button className="w-4 h-4 relative">
                    <Minusicon />
                  </button>
                </div>
                <div className="text-black text-base font-medium leading-none">
                  {count}개
                </div>
                <div className="w-8 h-8 rounded-[5px] border border-black flex-col justify-center items-center inline-flex">
                  <button className="w-4 h-4 relative">
                    <PlusIcon />
                  </button>
                </div>
              </div>
              <div className="justisfy-end items-center gap-[5px] flex">
                <div className="text-[#ea0000] text-base font-medium leading-none">
                  {price}원
                </div>
                <div className="h-8 px-4 rounded-2xl border border-black flex-col justify-center items-center inline-flex">
                  <button className="text-black text-base font-medium leading-none">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
