import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import Accordion from '../components/Accordion';
import Alert from '/src/assets/images/alert.png';
import WarningModal from '../components/WarningModal';
import { useMonitorStore } from '../../../zustand/useMonitorStore';

const MonitoringPage = () => {
  const { warnModalOpend, openWarnModal, closeWarnModal } = useMonitorStore();

  useCheckAuth('MANAGER');

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen  px-24'>
        <header className='items-center flex flex-col gap-3 py-20'>
          <h1 className='text-4xl font-bold'>
            우주 최강 이승원 앨범 출시 팬싸인회
          </h1>
          <h2 className='text-[#7D7D7D] text-[24px]'>2024.07.24</h2>
        </header>
        <span className='text-2xl font-bold'>총 3 건</span>
        <main className='py-7'>
          <div className='justify-center items-center '>
            <Accordion title='1번 팬 - 라이언' />
            <Accordion title='2번 팬 - 어피치' />
            <Accordion title='3번 팬 - 무지' />
          </div>
        </main>
      </div>
      {warnModalOpend && <WarningModal />}
      <div className='w-[360px] h-[180px] flex flex-col items-center justify-center rounded-3xl border border-[#FF4F5D]'>
        {/* 모달창 */}
        <div className='flex flex-col gap-4'>
          <div className='gap-3 flex flex-col items-center justify-center'>
            <div className='w-11 h-11'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-base'>
                “강창우” 팬에게 경고 1회 누적을 진행하시겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <button className='text-sm text-[#FF4F5D] border px-4 py-1 border-[#FF4F5D] hover:text-white rounded-lg hover:bg-[#FF4F5D]'>
              진행
            </button>
            <button className='text-sm text-[#FF4F5D] border px-4 py-1 border-[#FF4F5D] hover:text-white rounded-lg hover:bg-[#FF4F5D]'>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
