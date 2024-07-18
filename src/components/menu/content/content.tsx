import Button from './button';
import MenuList from './menuList';

export default function Content() {
  return (
    <>
      <div className="flex items-start gap-x-3 py-4 px-2.5">
        <Button selected={true}>돼지</Button>
        <Button selected={false}>소고기</Button>
        <Button selected={false}>닭</Button>
        <Button selected={false}>음료</Button>
      </div>
      <div className="flex w-[25.6875rem] py-2 px-4 gap-x-4 gap-y-6 items-center content-center justify-center flex-wrap">
        <MenuList menuName={'삼겹살'} menuPrice={'18000원'}></MenuList>
        <MenuList menuName={'삼겹살'} menuPrice={'18000원'}></MenuList>
        <MenuList menuName={'삼겹살'} menuPrice={'18000원'}></MenuList>
        <MenuList menuName={'삼겹살'} menuPrice={'18000원'}></MenuList>
      </div>
      <div className="flex flex-col w-[25.6875rem] p-4 items-start g-[0.625rem] absolute bottom-0 border-t-1px border-t-[#F0F0F0]">
        <button className="flex p-4 justify-center items-center g-[0.625rem] self-stretch rounded-lg bg-[#F0F0F0]">
          주문확인
        </button>
      </div>
    </>
  );
}
