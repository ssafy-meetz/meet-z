import useEnvSettingStore from '../../../zustand/useEnvSettingStore';

const SetCam = () => {
  const { nextStep, beforeStep } = useEnvSettingStore();
  return (
    <div className='flex flex-col w-[790px] items-center justify-center'>
      <div className='w-full flex flex-col px-24 h-full justify-center gap-1'>
        <span className='text-3xl font-semibold'>웹캠 연결</span>
        <span className='text-[#7d7d7d] text-lg'>
          아래 버튼을 클릭한 후 카메라, 마이크 권한을 허용해 주세요.
        </span>
        <button className=' h-72 mt-5 bg-white border hover:border-[#ff4f5d] focus:border-[#FF4F5D] focus:outline-none border-gray-200'>
          <span className='bg-[#323232] text-white rounded-2xl py-1 px-4 '>
            웹캠 연결하기
          </span>
        </button>
        <span className='text-[#7d7d7d] text-lg mt-2'>
          차단된 경우 시스템 환경설정에서
          <br /> Google Chrome의 카메라, 마이크 접근을 허용해 주세요.
        </span>
      </div>
      <div className='w-full flex justify-between h-28 px-14'>
        <button
          onClick={beforeStep}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d]  hover:bg-[#ff4f5d] hover:text-white'
        >
          이전
        </button>
        <button
          onClick={nextStep}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d]  hover:bg-[#ff4f5d] hover:text-white'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SetCam;
