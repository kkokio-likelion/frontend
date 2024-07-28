import { useState } from 'react';
import CheckIcon from '../../../assets/icon/check-icon';

type MenuCheckCallback = (
  checked: boolean,
  sidename: string,
  sideprice: number
) => void;

type Props = {
  plusSide: (sideprice: number) => void;
  onCheck: MenuCheckCallback;
  sidename: string;
  sideprice: number;
};

export default function Side({
  plusSide,
  sidename,
  sideprice,
  onCheck,
}: Props) {
  const [checked, setChecked] = useState(false);

  const checkClick = () => {
    if (checked) {
      plusSide(-sideprice);
      onCheck(false, sidename, sideprice);
    } else {
      plusSide(sideprice);
      onCheck(true, sidename, sideprice);
    }
    setChecked(!checked);
  };

  return (
    <div className="flex-col justify-start items-start self-stretch">
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
        <p className="grow font-medium leading-none text-base shrink basis-0">
          {sidename}
        </p>
        <p className="font-medium leading-none text-base">+{sideprice}원</p>
      </div>
    </div>
  );
}
