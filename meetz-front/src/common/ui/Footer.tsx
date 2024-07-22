import logowhite from '/src/assets/images/logo-white.png';
import github from '/src/assets/images/github.png';
import facebook from '/src/assets/images/facebook.png';
import twitter from '/src/assets/images/twitter.png';
import instagram from '/src/assets/images/instagram.png';
import youtube from '/src/assets/images/youtube.png';

const Footer = () => {
  return (
    <div className='bg-black flex w-full justify-center h-[130px] items-center'>
      <div className='flex w-[1226px] justify-between'>
        <div className='flex w-[618px] justify-between'>
          <div>
            <img
              src={logowhite}
              alt='Meet:Z 로고'
              className='w-[297px] h-[56px]'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-[14px] text-white'>
              이용약관 | 개인정보처리방침
            </span>
            <span className='text-[14px] text-white'>
              광주광역시 광산구 하남산단 6번로 107
            </span>
            <span className='text-[14px] text-white'>
              Copyright © 2024 MEETZ. All rights reserved.
            </span>
          </div>
        </div>
        <div className='flex w-[226px] justify-between mt-auto'>
          <img className='w-[30px] h-[30px]' src={github} alt='github' />
          <img className='w-[30px] h-[30px]' src={twitter} alt='twitter' />
          <img className='w-[30px] h-[30px]' src={facebook} alt='facebook' />
          <img className='w-[30px] h-[30px]' src={instagram} alt='instagram' />
          <img className='w-[30px] h-[30px]' src={youtube} alt='youtube' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
