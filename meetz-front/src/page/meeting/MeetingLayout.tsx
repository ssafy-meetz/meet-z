import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../common/ui/Header';
import Footer from '../../common/ui/Footer';
import useCheckAuth from '../../hooks/meeting/useCheckAuth';

const MeetingLayout: React.FC = () => {
  useCheckAuth('MANAGER');

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MeetingLayout;
