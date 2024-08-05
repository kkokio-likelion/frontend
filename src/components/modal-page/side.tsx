import { useState } from 'react';
import CheckIcon from 'assets/icon/check-icon';

type Side = {
  id: number;
  name: string;
  price: number;
};
type MenuCheckCallback = (
  checked: boolean,
  side:Side
) => void;

type Props = {
  side:Side
  plusSide: (sideprice: number) => void;
  onCheck: MenuCheckCallback;
};

export default function Side({
  plusSide,
  side,
  onCheck,
}: Props) {
  const [checked, setChecked] = useState(false);

  const checkClick = () => {
    if (checked) {
      plusSide(-side.price);
      onCheck(false, side);
    } else {
      plusSide(side.price);
      onCheck(true, side);
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
          {side.name}
        </p>
        <p className="font-medium leading-none text-base">+{side.price}원</p>
      </div>
    </div>
  );
}
