import Header from 'components/menu/header';
import Content from '../components/menu/content/content';
import Card from 'components/menu/card/card';
import OrderPage from 'components/menu/PO/orderpage';

export default function MenuPage() {
  return (
    <>
      <div className="flex flex-col w-[26.6875rem] h-[52.5rem] items-start">
        <Content/>
      </div>
    </>
  );
}
