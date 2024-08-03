import Header from 'components/front/header';
import Main from 'components/front/main';

export default function FrontPage() {
  return (
    <div className="w-dvw h-dvh flex flex-col bg-gray-50">
      <Header />
      <Main />
    </div>
  );
}
