import Minusicon from './minusicon';
import PlusIcon from './plusicon';
import Side from './side';

export default function Card() {
  return (
    <>
      <div className="flex flex-col g-4 items-start w-[24.6875rem] p-4 border-l-4 border-t-4 ">
        <div className="flex py-2 px-0 items-center g-4 self-stretch">
          {/*위쪽 수량계산*/}
          <div className="w-[6.875rem] h-[6.875rem] p-1 items-center g-[0.625rem]">
            <image className="w-[6.375rem] h-[3.9375rem] flex-shrink-0"></image>
          </div>
          <div className="flex flex-col justify-between items-end flex-[1_0_0] self-stretch">
            <p className="self-stretch text-[1.125rem] font-medium leading-[1.125rem]">
              삼겹살
            </p>
            <div className="flex justify-center items-center gap-3">
              <button className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black">
                <Minusicon />
              </button>
              <p className="text-center font-noto text-lg font-medium leading-[1.125rem]">
                99
              </p>
              <button className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black">
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
        <hr className="w-[22.6875rem] h-[0.0625rem] bg-gray-400 border-0" />
        {/*구분 선*/}
        <div className="flex flex-col items-start self-stretch">
          <Side />
        </div>
        <button className="flex p-4 justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-[#62BDF0] text-[1.25rem] font-medium leading-5 text-white">
          담기
        </button>
      </div>
    </>
  );
}
