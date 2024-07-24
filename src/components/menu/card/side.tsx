import { useState } from 'react';
import CheckIcon from '../../../assets/icon/check-icon';

type MenuCheckCallback = (
  checked: boolean,
  sidename: string,
  sideprice: number
) => void;

type Props = {
  plusSide: (sideprice: number) => void;
  sidename: string;
  sideprice: number;
  menucheck: MenuCheckCallback;
};

export default function Side({
  plusSide,
  sidename,
  sideprice,
  menucheck,
}: Props) {
  const [checked, setChecked] = useState(false);

  const checkClick = () => {
    if (checked) {
      plusSide(-sideprice);
      menucheck(false, sidename, sideprice);
    } else {
      plusSide(sideprice);
      menucheck(true, sidename, sideprice);
    }
    setChecked(!checked);
  };

  return (
    <div className="flex py-4 px-0 items-center gap-4 self-stretch">
      {checked ? (
        <button onClick={checkClick}>
          <CheckIcon />
        </button>
      ) : (
        <div
          onClick={checkClick}
          className="w-6 h-6 relative bg-white rounded-[5px] border border-neutral-400"
        ></div>
      )}
      <p className="flex-[1_0_0] font-medium leading-4 text-[1rem]">
        {sidename}
      </p>
      <p className="font-medium leading-4 text-[1rem]">+{sideprice}원</p>
    </div>
  );
}
