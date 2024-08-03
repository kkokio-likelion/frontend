type Props = {
  menuName: string;
  menuPrice: number;
  MenuClick: () => void;
  side: Array<Side>;
};

type Side = {
  name: string;
  price: number;
};

export default function MenuList({ menuName, menuPrice, MenuClick }: Props) {
  return (
    <>
      <div
        onClick={MenuClick}
        className="flex-col justify-start items-start gap-3 inline-flex"
      >
        <div className="w-44 h-44 p-4 border border-[#dddddd] justify-start items-center gap-2.5 inline-flex">
          <img
            src="https://via.placeholder.com/143x88"
            alt="이미지"
            className="grow shrink basis-0 h-[88px]"
          />
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          <p className="self-stretch text-black text-lg font-medium leading-snug">
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

<div className="flex-col justify-start items-start gap-3 inline-flex">
  <div className="w-[200px] h-[200px] p-4 border border-[#dddddd] justify-start items-center gap-2.5 inline-flex">
    <img
      className="grow shrink basis-0 h-[88px]"
      src="https://via.placeholder.com/168x88"
    />
  </div>
  <div className="self-stretch h-[42px] flex-col justify-start items-start gap-1 flex">
    <div className="self-stretch text-black text-lg font-medium leading-snug">
      삼겹살
    </div>
    <div className="self-stretch text-black text-base font-normal leading-none">
      18,000원
    </div>
  </div>
</div>;
