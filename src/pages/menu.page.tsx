import Header from 'components/menu/header';
import Content from '../components/menu/content/content';
import Card from 'components/menu/card/card';

export default function MenuPage() {
  return (
    <>
      <div className="flex flex-col w-[25.6875rem] h-[52.5rem] items-start">
        <Header />
        <Content />
        <Card />
      </div>
    </>
  );
}
