import postLogout from '../../apis/auth/postLogout';
import clearUserData from '../../lib/clearUserData';
import logo from '/src/assets/images/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logoutHandler = async () => {
    try {
      await postLogout(localStorage.getItem('rt') || '');
      localStorage.clear();
      clearUserData();
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error: any) {
    }
  };

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className='bg-white border-b shadow-lg border-gray-300 border-opacity-50 flex  justify-center'>
      <div className='flex max-w-screen-xl justify-between items-center w-full px-9 py-10'>
        <Link to='yet'>
          <img src={logo} alt='Meet:Z 로고' className='h-8' />
        </Link>
        <div className='flex justify-between w-full max-w-lg'>
          <div className='relative group'>
            <Link to='end' className='text-2xl font-bold'>
              완료된 미팅
            </Link>
            <div
              className={`absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#ff4f5d] transform transition-transform duration-200 origin-center scale-x-0 group-hover:scale-x-100 ${isActive('end') ? 'scale-x-100' : 'scale-x-0'
                }`}
            ></div>
          </div>
          <div className='relative group'>
            <Link to='yet' className='text-2xl font-bold'>
              미완료 미팅
            </Link>
            <div
              className={`absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#ff4f5d] transform transition-transform duration-200 origin-center scale-x-0 group-hover:scale-x-100 ${isActive('yet') ? 'scale-x-100' : 'scale-x-0'
                }`}
            ></div>
          </div>
          <div className='relative group'>
            <Link to='blacklist' className='text-2xl font-bold'>
              블랙리스트
            </Link>
            <div
              className={`absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#ff4f5d] transform transition-transform duration-200 origin-center scale-x-0 group-hover:scale-x-100 ${isActive('blacklist') ? 'scale-x-100' : 'scale-x-0'
                }`}
            ></div>
          </div>
          <div className='relative group'>
            <button className='text-2xl font-bold' onClick={logoutHandler}>
              로그아웃
            </button>
            <div className='absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#ff4f5d] transform transition-transform duration-200 origin-center scale-x-0 group-hover:scale-x-100'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
