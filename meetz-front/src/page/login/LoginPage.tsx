import { useNavigate } from 'react-router-dom';
import LoginBox from './components/LoginBox';
import loginemoji from '/src/assets/images/login_emoji.png';
import fetchUserData from '../../lib/fetchUserData';
import clearUserData from '../../lib/clearUserData';
import { useEffect, useState } from 'react';
import postLogout from '../../apis/auth/postLogout';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = fetchUserData();

  const [startBottomTextAnimation, setStartBottomTextAnimation] =
    useState(false);

  const logoutHandler = async () => {
    try {
      await postLogout(localStorage.getItem('rt') || '');
      localStorage.clear();
      clearUserData();
      alert('로그아웃 되었습니다.');
      navigate('/', { replace: true });
    } catch (error: any) { }
    return;
  };

  useEffect(() => {
    if (accessToken || localStorage.getItem('rt')) {
      const result = window.confirm('로그인 상태입니다. 로그아웃 하시겠습니까?');
      if (result) {
        postLogout(localStorage.getItem('rt') || '');
        clearUserData();
        localStorage.clear();
      } else {
        navigate(-1);
      }
    }
  }, []);

  useEffect(() => {
    const totalAnimationDuration = 7 * 0.1 + 10 * 0.1; // MEET:Z (7글자) + 에서 편하게 (10글자)의 애니메이션 시간
    const timeout = setTimeout(() => {
      setStartBottomTextAnimation(true);
    }, totalAnimationDuration * 1000);

    return () => clearTimeout(timeout);
  }, []);

  const getDelay = (index: any) => `${index * 0.1}s`;

  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col lg:flex-row justify-center items-center w-full max-w-screen-xl px-5 lg:px-28 gap-5 lg:gap-20'>
        <div className='w-full flex-col gap-20 justify-center lg:justify-end lg:flex hidden'>
          <div className='text-white text-4xl font-semibold  text-container '>
            <div className='pb-2 flex items-center'>
              {'MEET:Z'.split('').map((char, index: any) => (
                <span
                  key={index}
                  className='font-audiowide font-normal text-6xl opacity-0 animate-slideInFromTop'
                  style={{ animationDelay: getDelay(index) }}
                >
                  {char}
                </span>
              ))}
              {' 에서 편하게'.split('').map((char, index: any) => (
                <span
                  key={index}
                  className='opacity-0 animate-slideInFromTop'
                  style={{ animationDelay: getDelay(index + 7) }} // MEET:Z의 글자 수(7)만큼 더해줌
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <div>
              {'나의 스타와 팬을 만나보세요'
                .split('')
                .map((char, index: any) => (
                  <span
                    key={index}
                    className={`opacity-0 ${startBottomTextAnimation
                      ? 'animate-slideInFromBottom'
                      : ''
                      }`}
                    style={{ animationDelay: getDelay(index) }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
            </div>
          </div>
          <img src={loginemoji} alt='emoji' className='animate-floatIn' />
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
