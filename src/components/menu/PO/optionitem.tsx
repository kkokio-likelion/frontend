import Xicon from './xicon';


type Props = {
  sidename: string;
  sideprice: number;
};



export default function OptionItem({sidename, sideprice}:Props) {
  return (
    <>
      
        <p className="flex-[1_0_0] text-[16px] font-medium leading-[16px]">
          {sidename}
        </p>
        <p className="text-[16px] font-medium leading-[16px]">+{sideprice}원</p>
      
    </>
  );
}
