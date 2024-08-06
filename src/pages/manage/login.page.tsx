import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [cookies, setCookie] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const login = async () => {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        body: data,
      });

      if (res.status === 400) {
        return setErrorMsg('아이디 또는 비밀번호가 일치하지 않습니다.');
      }

      // parse jwt token
      const token = decodeURIComponent(
        res.headers.get('Authorization') || ''
      ).replace(/^Bearer /, '');

      if (!token) {
        return setErrorMsg('서버와 연결할 수 없습니다.');
      }

      setErrorMsg('');
      setCookie('accessToken', token);
      navigate(searchParams.get('redirect') || '/admin');
    } catch (e) {
      setErrorMsg('로그인에 실패했습니다.');
      console.error(e);
    }
  };

  return (
    <div className="w-dvw h-dvh flex flex-col gap-8 px-4 py-8 justify-center items-center">
      <h1 className="py-2 text-2xl font-medium">관리자 로그인</h1>
      <div className="flex flex-col gap-4 w-80 items-stretch">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-400 text-lg leading-none"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-400 text-lg leading-none"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
          />
          {errorMsg && <span className='text-red-500 font-medium'>{errorMsg}</span>}
        </div>
        <button
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
          onClick={login}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
