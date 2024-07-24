import { Outlet } from 'react-router-dom';
import Header from '../../common/ui/Header';
import Footer from '../../common/ui/Footer';

const MeetingLayout: React.FC = () => {
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
