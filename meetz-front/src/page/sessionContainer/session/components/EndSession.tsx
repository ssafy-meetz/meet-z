import { useEffect } from 'react';
import logo from '/src/assets/images/sessionlogo.png';
import useRecorder from '../../../../hooks/session/useRecorder';
import fetchUserData from '../../../../lib/fetchUserData';

const EndSession = () => {
  const { stopRecording, sendRecording } = useRecorder();
  const { accessToken } = fetchUserData();

  // 문구를 구성하는 각 문자에 고유한 애니메이션을 적용
  const endMessage = '미팅이 종료되었습니다.';
  const emailMessage =
    '오늘 추억을 남겼다면 사진을 이메일로 보내드릴게요.';

  useEffect(() => {
    stopRecording();
    sendRecording(accessToken || '');
  }, [])

  // 각 문자를 span으로 감싸서 개별 애니메이션을 적용
  const renderStaggeredText = (text: string) => {
    return (
      <span className='inline-block'>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className='inline-block opacity-0 animate-staggeredFadeIn'
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char} {/* 공백 문자를 처리 */}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className='flex flex-col items-center gap-5 p-10  min-h-screen justify-center'>
      <img
        src={logo}
        alt='logo'
        className='w-[300px] h-[60px] animate-staggeredFadeIn'
      />
      <div className='flex flex-col items-center text-center'>
        <div className='text-white font-medium text-5xl mb-4'>
          {renderStaggeredText(endMessage)}
        </div>
        <div className='text-white font-light text-3xl'>
          {renderStaggeredText(emailMessage)}
        </div>
      </div>
    </div>
  );
};

export default EndSession;
