import Button from './button';

export default function Content() {
  return (
    <>
      <div className="flex items-start gap-x-3">
        <Button selected = {true}>돼지</Button>
        <Button selected = {false}>소고기</Button>
        <Button selected = {false}>닭</Button>
        <Button selected = {false}>음료</Button>
      </div>
    </>
  );
}
