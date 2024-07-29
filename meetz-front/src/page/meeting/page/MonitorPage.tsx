import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import Accordion from '../components/Accordion';
import WarningModal from '../components/WarningModal';
import BlackModal from '../components/BlackModal';
import { useMonitorStore } from '../../../zustand/useMonitorStore';

const MonitoringPage = () => {
  const { warnModalOpend, blackModalOpend } = useMonitorStore();

  // useCheckAuth('MANAGER');

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen  px-24'>
        <header className='items-center flex flex-col py-20'>
          <h1 className='text-4xl font-bold pb-14'>신고 당한 미팅</h1>
          <h1 className='text-[28px] font-bold text-[#ff4f5d]'>
            우주 최강 이승원 앨범 출시 팬싸인회
          </h1>
          <h2 className='text-[#7D7D7D] text-[24px]'>2024.07.24 오후 4시 (50명 참여)</h2>
        </header>
        <span className='text-2xl font-bold'>총 3 건</span>
        <main className='py-7 pb-72'>
          <div className='justify-center items-center '>
            <Accordion title='1번 팬 - 창우강' />
            <Accordion title='2번 팬 - 승원빈' />
            <Accordion title='3번 팬 - 다이슨' />
          </div>
        </main>
      </div>
      {warnModalOpend && <WarningModal />}
      {blackModalOpend && <BlackModal />}
    </div>
  );
};

export default MonitoringPage;
