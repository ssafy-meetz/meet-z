import logo from '/src/assets/images/logo.png';

const Header = () => {
  return (
    <div className=' bg-white border-b border-gray-300 border-opacity-50 flex  justify-center'>
      
      <div className='flex max-w-screen-xl justify-between items-center w-full px-9 py-10'>
          <button>
            <img src={logo} alt='Meet:Z 로고' className='h-8' />
          </button>
        <div className='flex justify-between w-full max-w-sm'>
          <button className='text-2xl font-bold'>완료된 미팅</button>
          <button className='text-2xl font-bold'>미완료 미팅</button>
          <button className='text-2xl font-bold'>로그아웃</button>
        </div>
      </div>
      </div>
  
  );
};

export default Header;
