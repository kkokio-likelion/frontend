import Header from 'components/front/header';
import Main from 'components/front/main';

export default function FrontPage() {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <div className="bg-gradient-to-b from-[#4f615a] from-[49%] to-white to-[51%] absolute top-0 left-0 w-dvw h-dvh -z-10 flex flex-col justify-center items-center">
        <div className="wrapper w-dvw min-h-[80%]">
          <img src="/images/server.webp" className="h-full object-cover" />
        </div>
      </div>
      <Header />
      <Main />
    </div>
  );
}
