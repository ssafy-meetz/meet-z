import SignupBox from './components/SignupBox';
import loginemoji from '/src/assets/images/login_emoji.png';

const SignupPage = () => {
  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col lg:flex-row justify-center items-center w-full max-w-screen-xl px-5 lg:px-28 gap-5 lg:gap-20'>
        <div className='w-full flex-col gap-20 justify-center lg:justify-end lg:flex hidden'>
          <div className='text-white text-4xl font-semibold '>
            <div className='pb-2 flex items-center'>
              {'MEET:Z'.split('').map((char, index: any) => (
                <span
                  key={index}
                  className='font-audiowide font-normal text-6xl'
                >
                  {char}
                </span>
              ))}
              {' 에서 편하게'.split('').map((char, index: any) => (
                <span key={index} className=''>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <div>
              {'나의 스타와 팬을 만나보세요'
                .split('')
                .map((char, index: any) => (
                  <span key={index} className=''>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
            </div>
          </div>
          <img src={loginemoji} alt='로그인 로고' className='' />
        </div>
        <div className='w-full flex flex-col items-center lg:justify-start'>
          <div className='lg:mt-[50px]'>
            <SignupBox />
            <p className='text-white text-center text-xl mt-8 lg:hidden text-shadow-glow'>
              해당 서비스는 PC에서만 이용 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
