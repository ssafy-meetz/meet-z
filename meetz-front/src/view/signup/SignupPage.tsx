import SignupBox from './components/SignupBox';
import loginImage from '/src/assets/images/login_image.png';
const SignupPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br  from-[#FE9374] to-[#FE4D5C] flex justify-center items-center'>
      <div className='w-[1104px] flex justify-between items-center'>
        <img src={loginImage} alt='로그인 로고' className='w-[520px]' />
        <div>
          <SignupBox />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
