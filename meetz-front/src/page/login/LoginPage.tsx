import { useNavigate } from 'react-router-dom';
import LoginBox from './components/LoginBox';
import loginImage from '/src/assets/images/login_image.png';
import fetchUserData from '../../lib/fetchUserData';
import clearUserData from '../../lib/clearUserData';
import { useEffect } from 'react';
import postLogout from '../../apis/auth/postLogout';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = fetchUserData();

  const logoutHandler = async () => {
    try {
      await postLogout(localStorage.getItem('rt') || '');
      localStorage.clear();
      clearUserData();
      alert('로그아웃 되었습니다.');
      navigate('/', { replace: true });
    } catch (error: any) {
    }
    return;
  }

  useEffect(() => {
    if (accessToken) {
      if (window.confirm('현재 로그인 상태입니다. 로그아웃 후 로그인 페이지로 이동하시겠습니까?')) {
        logoutHandler();
      } else {
        navigate(-1);
      }
    }
  }, [])

  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col lg:flex-row justify-center items-center w-full max-w-screen-xl px-5 lg:px-28 gap-5 lg:gap-20'>
        <div className='w-full  justify-center lg:justify-end lg:flex hidden'>
          <img src={loginImage} alt='로그인 로고' className='w-3/4 lg:w-full' />
        </div>
        <div className='w-full flex justify-center lg:justify-start'>
          <div className='lg:mb-[100px]'>
            <LoginBox />
            <p className='text-white text-center text-xl mt-8 lg:hidden text-shadow-glow'>
              해당 서비스는 PC에서만 이용 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
