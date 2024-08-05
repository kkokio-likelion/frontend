import PlusIcon from 'assets/icon/plus-icon';
import { numberWithCommas } from 'utils/functions';

export type Props = {
  menuName: string;
  menuPrice: number;
  onClick?: () => void;
};

export default function SideItem({ menuName, menuPrice = 0, onClick }: Props) {
  return (
    <li
      onClick={onClick}
      className="flex flex-row items-center gap-3 px-4 py-4 w-full cursor-pointer relative"
    >
      <PlusIcon />
      <span className="self-stretch text-lg font-medium leading-none w-0 flex-1">
        {menuName}
      </span>
      <span className="self-stretch text-base font-normal leading-none">
        {numberWithCommas(menuPrice)}원
      </span>
    </li>
  );
}
