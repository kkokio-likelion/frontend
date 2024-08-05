import Minusicon from '../../../assets/icon/minus-icon';
import PlusIcon from '../../../assets/icon/plus-icon';
import OptionItem from './side-item';

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
  menu: Menu;
  minusMenu: (menuId: number, sideIds: number[]) => void;
  plusMenu: (menuId: number, sideIds: number[]) => void;
  deleteMenu: (menuId: number, sideIds: number[]) => void;
};

export default function MenuInfo({
  menu,
  minusMenu,
  plusMenu,
  deleteMenu,
}: Props) {
  return (
    <>
      <div className="w-dvw self-stretch p-4 border-b border-[#f0f0f0] flex-col justify-center items-start gap-4 flex">
        <div className=" self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-4 inline-flex">
            <div className="w-[73px] h-[73px] p-2 border border-[#dddddd] justify-start items-center gap-2.5 flex">
              <img
                src={menu.img}
                className="grow shrink basis-0 h-[29px]"
              ></img>
            </div>
            <p className="grow shrink basis-0 text-black text-xl font-medium leading-tight">
              {menu.name}
            </p>
            <button
              onClick={() =>
                deleteMenu(
                  menu.id,
                  menu.sides.map((side) => side.id)
                )
              }
              className="flex h-8 px-4 flex-col justify-center items-center rounded-2xl border border-[#DB0000] text-[#DB0000] text-base font-medium leading-none"
            >
              삭제
            </button>
          </div>
          <div className="self-stretch justify-end items-center gap-4 inline-flex">
            <p className="text-[#EB0000] text-[16px] font-medium leading-[16px]">
              {menu.price}원
            </p>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() =>
                  minusMenu(
                    menu.id,
                    menu.sides.map((side) => side.id)
                  )
                }
                className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black"
              >
                <Minusicon />
              </button>
              <p className="text-center font-noto text-lg font-medium leading-[1.125rem]">
                {menu.count}
              </p>
              <button
                onClick={() =>
                  plusMenu(
                    menu.id,
                    menu.sides.map((side) => side.id)
                  )
                }
                className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black"
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
        {menu.sides.map((item, index) => (
          <OptionItem key={index} name={item.name} price={item.price} />
        ))}
      </div>
    </>
  );
}
