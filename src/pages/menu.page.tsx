import Header from 'components/menu/header';
import Content from '../components/menu/content/content';

export default function MenuPage() {
  return (
    <>
      <div className="flex flex-col w-dvw items-start">
        <Header />
        <Content />
      </div>
    </>
  );
}
