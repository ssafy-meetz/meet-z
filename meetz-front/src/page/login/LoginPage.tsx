import LoginBox from './components/LoginBox';
import loginImage from '/src/assets/images/login_image.png';

const LoginPage = () => {
  return (
    <div className=' bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center '>
      <div className='flex justify-center '>
        <div className='flex justify-between max-w-screen-xl items-center px-28 gap-20'>
          <div className='w-full'>
          <img src={loginImage} alt='로그인 로고'  />
          </div>
          <div className='mb-[100px]'>
            <LoginBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
