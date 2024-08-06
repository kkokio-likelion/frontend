type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick: (menu: string) => void;
  value: string | undefined;
};

export default function Button({ children, onClick, selected, value }: Props) {
  return (
    <>
      <button
        onClick={() => onClick(value!)}
        className={
          selected
            ? 'h-8 px-4 py-2 bg-black rounded-[17px] justify-center items-center gap-2.5 inline-flex text-white text-base font-medium leading-none'
            : 'h-8 px-4 py-2 bg-white rounded-[17px] border border-[#dddddd] justify-center items-center gap-2.5 inline-flex text-black text-base font-medium leading-none '
        }
      >
        {children}
      </button>
    </>
  );
}
