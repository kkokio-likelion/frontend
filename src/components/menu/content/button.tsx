import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick: any;
};

export default function Button({ children, onClick, selected }: Props) {
  return (
    <>
      <button
        onClick={() => onClick(children)}
        className={
          selected
            ? 'flex p-2 px-4 justify-center items-center gap-2.5  bg-black text-white rounded-[17px]'
            : 'flex p-2 px-4 justify-center items-center gap-2.5 bg-white text-black rounded-[17px] border border-[#dddddd]'
        }
      >
        {children}
      </button>
    </>
  );
}
