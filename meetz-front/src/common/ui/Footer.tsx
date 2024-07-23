import logowhite from '/src/assets/images/logo-white.png';
import github from '/src/assets/images/github.png';
import facebook from '/src/assets/images/facebook.png';
import twitter from '/src/assets/images/twitter.png';
import instagram from '/src/assets/images/instagram.png';
import youtube from '/src/assets/images/youtube.png';

const Footer = () => {
  return (
    <div className='bg-black flex w-full justify-center items-center'>
      <div className='flex max-w-screen-xl w-full px-14 py-9 justify-between'>
        <div className='flex gap-5 justify-between'>
          <div>
            <img
              src={logowhite}
              alt='Meet:Z 로고'
              className='w-72 h-14'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-white'>
              이용약관 | 개인정보처리방침
            </span>
            <span className='text-sm text-white'>
              광주광역시 광산구 하남산단 6번로 107
            </span>
            <span className='text-sm text-white'>
              Copyright © 2024 MEETZ. All rights reserved.
            </span>
          </div>
        </div>
        <div className='flex w-56 justify-between mt-auto'>
          <img className='w-8 h-8' src={github} alt='github' />
          <img className='w-8 h-8' src={twitter} alt='twitter' />
          <img className='w-8 h-8' src={facebook} alt='facebook' />
          <img className='w-8 h-8' src={instagram} alt='instagram' />
          <img className='w-8 h-8' src={youtube} alt='youtube' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
