import logo from '/src/assets/images/logo.png';

const Header = () => {
  return (
    <div className='w-full h-[116px] bg-white flex justify-center items-center border-b border-gray-300 border-opacity-50'>
      <div className='flex justify-between w-[1229px]'>
        <div className='items-start'>
          <button>
            <img src={logo} alt='Meet:Z 로고' className='w-[169px] h-[32px]' />
          </button>
        </div>
        <div className='w-[339px] flex justify-between'>
          <button className='text-[24px] font-bold'>완료된 미팅</button>
          <button className='text-[24px] font-bold'>미완료 미팅</button>
          <button className='text-[24px] font-bold'>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
