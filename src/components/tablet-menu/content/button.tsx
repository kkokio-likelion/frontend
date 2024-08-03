import BlackArrowIcon from 'assets/icon/black-arrow-icon';
import WhiteArroweIcon from 'assets/icon/white-arrow-icon';

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick: (menu: string) => void;
  value: string;
};

export default function Button({ children, onClick, selected, value }: Props) {
  return (
    <div
      className={
        selected
          ? 'bg-[#333333] self-stretch p-4  rounded-lg justify-start items-center gap-2.5 inline-flex'
          : 'bg-white self-stretch p-4  rounded-lg justify-start items-center gap-2.5 inline-flex'
      }
    >
      <button
        onClick={() => onClick(value)}
        className={
          selected
            ? 'grow shrink basis-0 h-[18px] justify-start items-center gap-2.5 flex p-4 bg-[#333333] rounded-lg text-white text-lg font-medium leading-none'
            : 'grow shrink basis-0 h-[18px] justify-start items-center gap-2.5 flex p-4 bg-white rounded-lg  text-black text-lg font-medium leading-none'
        }
      >
        {children}
      </button>
      <div className="w-6 h-6 relative">
        {selected ? <WhiteArroweIcon /> : <BlackArrowIcon />}
      </div>
    </div>
  );
}
