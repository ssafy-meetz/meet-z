import useEnvSettingStore from '../../../zustand/useEnvSettingStore';

const SetWait = () => {
  const { beforeStep } = useEnvSettingStore();
  //SSE 수신 기다림 수신 되면, sessionId, starName localStorage로 이동!!
  return (
    <div className='flex flex-col w-[790px] items-center justify-center  '>
      <div className='w-full flex flex-col px-24 h-full justify-center gap-12'>
        <div className='flex flex-col items-center text-2xl'>
          <span className=' font-semibold'>오늘 팬 싸인회 순서는?</span>
          <span className='text-[#FE9374] font-bold'>
            이승원-손다인-김태연-신민경-강창우
          </span>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <span className='font-semibold text-2xl'>이승원과의 만남까지</span>
          <span className='font-bold text-5xl'>
            <span className='text-[#FE9374]'>14</span>명 (약 28분)
          </span>
          <span className='font-semibold text-2xl'>
            남았습니다! 잠시만 기다려 주세요
          </span>
        </div>
      </div>
      <div className='w-full flex justify-start h-28 px-14 '>
        <button
          onClick={beforeStep}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d]  hover:bg-[#ff4f5d] hover:text-white'
        >
          이전
        </button>
      </div>
    </div>
  );
};

export default SetWait;
