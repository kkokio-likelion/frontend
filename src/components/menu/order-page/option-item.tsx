type Props = {
  name: string;
  price: number;
};

export default function OptionItem({ name, price }: Props) {
  return (
    <>
      <div className="self-stretch justify-center items-center gap-3.5 inline-flex">
        <p className="grow shrink basis-0 text-black text-base font-medium leading-none">
          {name}
        </p>
        <p className="text-black text-base font-medium leading-none">
          +{price}원
        </p>
      </div>
    </>
  );
}
