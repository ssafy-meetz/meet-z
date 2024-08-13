import { useState, useEffect } from 'react';
import logo from '/src/assets/images/sessionlogo.png';
import meetz from '/src/assets/images/meetz.png';
import SessionLoading from '../../../../common/SessionLoading';
import getFanSession from '../../../../apis/session/getFanSession';
import { useSessionStore } from '../../../../zustand/useSessionStore';
import fetchUserData from '../../../../lib/fetchUserData';

const LoadingSession = () => {
  const { timer, setTimer, decrementTimer, message, setMessage } =
    useSessionStore();
  const [fadeClass, setFadeClass] = useState('opacity-100'); // 초기 opacity 상태

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    try {
      const { accessToken } = fetchUserData();

      if (accessToken) {
        const timerValue = await getFanSession(accessToken);
        if (timerValue !== null) {
          setTimer(timerValue);
        } else {
          console.error('타이머 값을 가져오지 못했습니다.');
        }
      } else {
        console.error('엑세스 토큰을 사용할 수 없습니다.');
      }
    } catch (error: any) {
      console.error(
        '세션 정보를 가져오는 중 오류가 발생했습니다:',
        error.message
      );
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        decrementTimer();
        setFadeClass('opacity-0'); // fade out

        setTimeout(() => {
          setFadeClass('opacity-100'); // fade in
        }, 500);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setMessage('곧 스타와 연결 됩니다!');
    }
  }, [timer, decrementTimer, setMessage]);

  useEffect(() => {
    setMessage(`스타와 만나기 ${timer} 초 전!`);
  }, [timer]);

  return (
    <div className='flex flex-col items-center gap-6 '>
      <img src={meetz} alt='meetz' className='w-40 animate-bounce -mb-14' />
      <div className='pr-4'>
        <SessionLoading />
      </div>
      <div className='flex flex-col items-center gap-5'>
        <img src={logo} alt='logo' className='w-[220px] h-[40px]' />
        <span
          className={`text-white font-semibold text-5xl transition-opacity duration-500 ${fadeClass}`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default LoadingSession;
