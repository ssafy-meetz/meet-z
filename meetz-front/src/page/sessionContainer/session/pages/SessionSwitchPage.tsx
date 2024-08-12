import EndSession from '../components/EndSession';

const SessionSwitchPage = () => {
  
  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col max-w-screen-xl w-full items-center justify-center'>
        <EndSession/> 
      </div>
    </div>
  );
};

export default SessionSwitchPage;