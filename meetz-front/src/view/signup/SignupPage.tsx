import SignupBox from './components/SignupBox';
import loginImage from '/src/assets/images/login_image.png';
const SignupPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br  from-[#FE9374] to-[#FE4D5C] flex items-start justify-center'>
      <div className='w-[1104px] h-[740px] flex justify-between items-start mt-[120px]'>
        <img
          src={loginImage}
          alt='로그인 로고'
          className='w-[520px] h-[674px]'
        />
        <div className='w-[464px] h-[660px] mt-[36px]'>
          <SignupBox />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
