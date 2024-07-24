import Header from 'components/menu/header';
import Content from '../components/menu/content/content';
import Card from 'components/menu/card/card';
import OrderPage from 'components/menu/PO/orderpage';

export default function MenuPage() {
  return (
    <>
      <div className="flex flex-col w-dvw  items-start">
        <Header />
        <Content />
      </div>
    </>
  );
}
