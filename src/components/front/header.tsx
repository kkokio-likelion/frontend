import ArrowBackIcon from 'assets/icon/arrow-back-icon';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="px-2 py-6">
      <Link to="/menu" className="flex items-center gap-2 font-medium text-lg ">
        <ArrowBackIcon className="fill-black" />
        메뉴 보면서 직접 고르기
      </Link>
    </header>
  );
}
