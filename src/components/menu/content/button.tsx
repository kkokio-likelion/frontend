type Props = {
  children: React.ReactNode;
  selected: boolean;
};

export default function Button({ children, selected }: Props) {
  return (
    <>
      {selected ? (
        <button className="flex p-2 px-4 justify-center items-center gap-[10px] bg-black text-white rounded-[17px]">
          {children}
        </button>
      ) : (
        <button className="flex p-2 px-4 justify-center items-center gap-[10px] bg-white text-black rounded-[17px] border-[1px] border-[#dddddd]">
          {children}
        </button>
      )}
    </>
  );
}
