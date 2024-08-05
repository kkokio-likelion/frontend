type Props = {
  menu:Menu
  MenuClick: () => void;
};

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

export default function MenuList({ menu, MenuClick }: Props) {
  return (
    <>
      <div
        onClick={MenuClick}
        className="flex-col justify-start items-start gap-3 inline-flex"
      >
        <div className="w-44 h-44 p-4 border border-[#dddddd] justify-start items-center gap-2.5 inline-flex">
          <img
            src={menu.img}
            alt="이미지"
            className="grow shrink basis-0 h-[88px]"
          />
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          <p className="self-stretch text-black text-lg font-medium leading-snug">
            {menu.name}
          </p>
          <p className="self-stretch text-black text-base font-normal leading-none ">
            {menu.price}원
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
}
