import React from 'react';
import LoginBox from './components/LoginBox';
import loginImage from '/src/assets/images/login_image.png';

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br  from-[#FE9374] to-[#FE4D5C] flex items-start justify-center'>
      <div className='w-[1104px] h-[740px] flex mt-[120px] justify-between items-start'>
        <img
          src={loginImage}
          alt='로그인 로고'
          className='w-[520px] h-[674px]'
        />
        <div className='mt-[36px]'>
          <LoginBox />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
