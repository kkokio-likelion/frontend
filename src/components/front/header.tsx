import ArrowBackIcon from 'assets/icon/arrow-back-icon';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="px-6 py-6 bg-white">
      <Link to="/menu" className="flex items-center gap-2 font-medium text-lg ">
        <ArrowBackIcon className="fill-black" />
        메뉴 보면서 직접 고르기
      </Link>
    </header>
  );
}
