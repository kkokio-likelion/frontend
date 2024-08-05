import { cubicBezier, motion } from 'framer-motion';

export interface Props {
  onClick: () => void;
}

export default function UserInputOverlay({ onClick }: Props) {
  return (
    <motion.div
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-4xl max-[410px]:text-4xl max-[340px]:text-3xl font-medium leading-tight select-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, padding: 16, paddingBottom: 16 }}
      exit={{ opacity: 0, paddingBottom: 500 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <motion.span
        className="text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: cubicBezier(0.35, 0.17, 0.3, 0.86),
        }}
      >
        주문하려면
        <br />
        화면을 눌러주세요
      </motion.span>
    </motion.div>
  );
}
