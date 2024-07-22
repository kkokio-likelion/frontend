import { useState } from 'react';
import Minusicon from '../card/minusicon';
import MinusIcon from '../card/minusicon';
import PlusIcon from '../card/plusicon';
import OptionItem from './optionitem';

type Props = {
  name: string;
  price: number;
  count: number;
  side: any;
};

export default function MenuInfo({ name, price, count, side }: Props) {
  
 
  return (
    <>
      <div className="flex flex-col p-4 justify-center items-start gap-6 self-stretch border-b border-[#F0F0F0]">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-center gap-4 self-stretch">
            <div className="flex w-[73px] h-[73px] p-2 items-center gap-[10px] border border-[#DDD]">
              <image className="h-[29px] flex-[1_0_0]"></image>
            </div>
            <p className="flex-1  text-[20px] font-medium leading-[20px]">
              {name}
            </p>
            <button className="flex h-[32px] px-4 flex-col justify-center items-center rounded-[16px] border border-[#DB0000] text-[#DB0000] text-[16px] font-medium leading-[16px]">
              삭제
            </button>
          </div>
          <div className="flex justify-end items-center gap-4 self-stretch">
            <p className="text-[#EB0000] text-[16px] font-medium leading-[16px]">
              {price}원
            </p>
            <div className="flex justify-center items-center gap-4">
              <button className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black">
                <Minusicon />
              </button>
              <p className="text-center font-noto text-lg font-medium leading-[1.125rem]">
                {count}
              </p>
              <button className="flex w-8 h-8 flex-col justify-center items-center rounded-2xl border border-black">
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
          {side.map((item, index) => (
            <div
              className="flex pl-4 items-center gap-[14px] self-stretch"
              key={index}
            >
            <OptionItem sidename={item.name} sideprice={item.price}/>
            </div>
          ))}
      </div>
    </>
  );
}
