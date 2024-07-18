type Props = {
  menuName: string;
  menuPrice: string;
};

export default function MenuList({ menuName, menuPrice }: Props) {
  return (
    <>
      <div className="flex flex-col items-start gap-[0.75rem]">
        <div className="flex itmes-center  w-[10.9375rem] h-[10.9375rem] p-[1rem] gap-[0.625rem] border-[1px] border-[#dddddd]">
          <image className="h-[5.5rem] flex-[1_0_0]"> </image>
        </div>
        <div className="gap-[0.25rem] self-stretch">
          <p className="text-[1.125rem] font-medium leading-[1.35rem] ">
            {menuName}
          </p>
          <p className="text-[1rem] leading-[1rem] font-normal ">{menuPrice}</p>
        </div>
      </div>
    </>
  );
}
