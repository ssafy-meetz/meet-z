import logo from '/src/assets/images/sessionlogo.png';

const StarEndSession = () => {
  const endMessage = '오늘도 수고 많으셨습니다.';
  const emailMessage = '팬들과의 소중한 추억을 만들어 주셔서 감사합니다.';

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
    <div className='flex flex-col items-center gap-7 p-10  min-h-screen justify-center'>
      <img
        src={logo}
        alt='logo'
        className='w-[300px] h-[60px] animate-staggeredFadeIn'
      />
      <div className='flex flex-col items-center text-center'>
        <div className='text-white font-medium text-4xl mb-2'>
          {renderStaggeredText(endMessage)}
        </div>
        <div className='text-white font-light text-3xl'>
          {renderStaggeredText(emailMessage)}
        </div>
      </div>
    </div>
  );
};

export default StarEndSession;
