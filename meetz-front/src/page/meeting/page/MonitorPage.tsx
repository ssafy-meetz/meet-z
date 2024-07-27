import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import Accordion from '../components/Accordion';
import WarningModal from '../components/WarningModal';
import BlackModal from '../components/BlackModal';
import { useMonitorStore } from '../../../zustand/useMonitorStore';

const MonitoringPage = () => {
  const { warnModalOpend, blackModalOpend } = useMonitorStore();

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
      {blackModalOpend && <BlackModal />}
    </div>
  );
};

export default MonitoringPage;
