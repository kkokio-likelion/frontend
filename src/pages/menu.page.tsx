import Header from 'components/mobile-menu/header';
import Content from '../components/mobile-menu/content/content';

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
