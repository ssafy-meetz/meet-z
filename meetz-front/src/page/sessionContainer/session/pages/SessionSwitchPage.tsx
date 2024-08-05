import React, { useState, useEffect } from 'react';
import logo from '/src/assets/images/sessionlogo.png';
import SessionLoading from '../../../../common/SessionLoading';
import EndSession from '../components/EndSession';
const SessionSwitchPage = () => {
  const [message, setMessage] = useState('스타와 팬을 연결 중이에요');
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Fade out

      setTimeout(() => {
        setMessage((prevMessage) =>
          prevMessage === '스타와 팬을 연결 중이에요'
            ? '잠시만 기다려주세요'
            : '스타와 팬을 연결 중이에요'
        );
        setFadeIn(true); // Fade in
      }, 500); // 500ms 동안 fade out 후 변경
    }, 3000); // 3000ms (3초)마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col max-w-screen-xl w-full items-center justify-center'>
        
        {/* 전환세션 */}
        {/* <div className='flex flex-col items-center gap-7 '>
          <div className='pr-4'>
            <SessionLoading />
          </div>
          <div className='flex flex-col items-center gap-5'>
            <img src={logo} alt="logo" className='w-[220px] h-[40px]' />
            <span
              className={`text-white font-semibold text-4xl transition-opacity duration-500 ${
                fadeIn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {message}
            </span>
          </div>
        </div> */}

        {/* 종료세션 */}
        <EndSession/> 
      </div>
    </div>
  );
};

export default SessionSwitchPage;