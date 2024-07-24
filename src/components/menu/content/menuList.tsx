type Props = {
  menuName: string;
  menuPrice: number;
  MenuClick: any;
  side: any;
};

export default function MenuList({
  menuName,
  menuPrice,
  side,
  MenuClick,
}: Props) {
  return (
    <>
      <div onClick={MenuClick} className="flex flex-col items-start gap-3">
        <div className="flex itmes-center  w-44 h-44 p-4 gap-2.5 border border-[#dddddd]">
          <image className="h-[5.5rem] flex-[1_0_0]"> </image>
        </div>
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          <p className="self-stretch text-black text-lg font-medium  leading-snug">
            {menuName}
          </p>
          <p className="self-stretch text-black text-base font-normal leading-none ">
            {menuPrice}원
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
}
