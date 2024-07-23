import LoginBox from './components/LoginBox';
import loginImage from '/src/assets/images/login_image.png';

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br  from-[#FE9374] to-[#FE4D5C] flex items-center justify-center'>
      <div className='w-[1104px] flex justify-between items-center'>
        <img src={loginImage} alt='로그인 로고' className='w-[520px]' />
        <div className='mb-[100px]'>
          <LoginBox />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
