import React from 'react';
import logo from '/src/assets/images/logo.png';

const SignupBox = () => {
  return (
    <div className='bg-white rounded-2xl  w-464px h-660 flex flex-col items-center '>
      <div className='w-[360px] my-[64px] '>
        <div className='flex items-center justify-between w-[269px] h[24px] mb-[40px]'>
          <img src={logo} alt='Meet:Z 로고' className='w-[102px] h-[19px]' />
          <span className='text-[20px] font-bold'>Manager sign up</span>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between space-x-2 h-[48px]'>
            <input
              type='text'
              placeholder='이메일(example@company.com)'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-[256px]'
            />
            <button className='flex items-center justify-center text-[16px] w-[96px] h-full text-[#FF4F5D] rounded-lg border border-solid border-[#FF4F5D]'>
              중복확인
            </button>
          </div>
          <div className='flex items-center justify-between space-x-2 h-[48px]'>
            <input
              type='text'
              placeholder='인증번호'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-[256px]'
            />
            <button className='flex items-center justify-center text-[16px] w-[96px] h-full text-[#FF4F5D] rounded-lg border border-solid border-[#FF4F5D]'>
              인증번호 발송
            </button>
          </div>
          <input
            type='text'
            placeholder='비밀번호 (영문, 숫자, 특문 중 2개 조합 8자)'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
          />
          <input
            type='text'
            placeholder='비밀번호 확인'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
          />
          <input
            type='text'
            placeholder='기관 또는 개인명'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
          />
          <input
            type='text'
            placeholder='휴대폰 번호 입력 (‘-’ 제외 11자리 입력)'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
          />
        </div>
        <button className='mt-[48px] w-full bg-[#FF4F5D] text-white p-4 rounded-lg text-16px'>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignupBox;
