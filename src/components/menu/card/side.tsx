import CheckIcon from './checkicon';

export default function Side() {
  return (
    <>
      <div className="flex py-4 px-0 items-center gap-4 self-stretch">
        <CheckIcon />
        <p className="flex-[1_0_0] font-medium leading-4 text-[1rem]">
          마늘 추가
        </p>
        <p className="font-medium leading-4 text-[1rem]">+1000원</p>
      </div>
    </>
  );
}
