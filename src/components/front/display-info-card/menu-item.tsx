import { motion } from 'framer-motion';
import { numberWithCommas } from 'utils/functions';

export type Props = {
  menuName: string;
  menuPrice: number;
  imageUrl?: string;
  onClick?: () => void;
};

const item = {
  hidden: { opacity: 0, top: -10 },
  show: { opacity: 1, top: 0 },
};

export default function MenuItem({
  menuName,
  menuPrice = 0,
  imageUrl = '',
  onClick,
}: Props) {
  return (
    <motion.li
      variants={item}
      onClick={onClick}
      className="flex flex-row col2:flex-col gap-3 w-full col2:w-[calc((100%-1rem)/2)] col3:w-[calc((100%-2rem)/3)] cursor-pointer relative"
    >
      <div className="border border-gray-300 flex justify-center items-center gap-2.5 col2:w-full col2:h-36 w-24 h-24">
        <img
          src={imageUrl}
          alt={`${menuName} 이미지`}
          className="w-[85%] h-[85%] object-cover"
        />
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1 flex">
        <p className="self-stretch text-lg font-medium leading-snug">
          {menuName}
        </p>
        <p className="self-stretch text-base font-normal leading-none">
          {numberWithCommas(menuPrice)}원
        </p>
      </div>
    </motion.li>
  );
}
