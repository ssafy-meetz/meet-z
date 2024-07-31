import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineTimer } from 'react-icons/md';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { FaRegHourglass } from 'react-icons/fa6';
import { useMonitorStore } from '../../../zustand/useMonitorStore';
import SendEmailModal from '../components/CreateAndModify/SendEmailModal';
const DetailPage = () => {
  useCheckAuth('MANAGER');

  const { sendModalOpend, openMailModal } = useMonitorStore();

  return (
    <div>
      <header className='flex flex-col items-center border-b pb-7'>
        <div className='max-w-screen-xl w-screen px-24 '>
          <div className='flex items-center pt-20'>
            <button className='text-4xl font-medium flex items-center'>
              우주최강 이승원 앨범 출시 팬 싸인회
              <IoIosArrowDown className='ml-5 text-[#ff4f5d]' />
            </button>
          </div>
          <div className='flex items-center justify-between mt-10'>
            <div className='flex gap-16'>
              <div className='flex items-center gap-4'>
                <IoCalendarNumberOutline className='text-4xl text-[#ff4f5d]' />
                <span className='text-3xl font-semibold'>7월 17일</span>
                <span className='text-xl font-semibold'>04:30 pm ~</span>
              </div>
              <div className='flex items-center gap-2 '>
                <MdOutlineTimer className='text-[#ff4f5d] text-xl' />
                <span className='text-xl font-semibold'>3분</span>
                <FaRegHourglass className='text-[#ff4f5d] text-xl' />
                <span className='text-xl font-semibold'>30초</span>
              </div>
            </div>
            <div>
              <button className='border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-white text-[#ff4f5d] rounded-3xl px-4 py-2'>
                미팅방 수정
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-screen px-24'>
          <div className='py-12'>
            <span className='text-2xl font-semibold'>방 목록</span>
          </div>
          <div className='flex gap-8 flex-wrap justify-center'>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='min-w-64 p-8 flex flex-col gap-3 border rounded-3xl border-[#ff4f5d] bg-white shadow-lg'
              >
                <span className='flex justify-center text-2xl text-[#ff4f5d]'>
                  다인
                </span>
                <div className='flex flex-col'>
                  <span>아이디 : dison@meetz.com</span>
                  <span>비밀번호: sdisdi552@!</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='max-w-screen-xl w-screen px-24 pt-24 pb-60'>
          <div className='flex justify-between pt-8 items-center'>
            <span className='text-2xl font-semibold'>팬 리스트</span>
            <button
              onClick={openMailModal}
              className='border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-white rounded-3xl px-4 py-2 text-[#ff4f5d]'
            >
              메일 발송
            </button>
          </div>
          <div className='overflow-y-auto h-96 mt-3'>
            <table className='w-full text-left  '>
              <thead>
                <tr className='bg-[#ff4f5d] text-white '>
                  <th className='py-4 pl-5 text-lg font-light rounded-tl-lg rounded-bl-lg'>
                    | 번호
                  </th>
                  <th className='py-4 pl-2 text-lg font-light'>| 이름</th>
                  <th className='py-4 pl-1 text-lg font-light'>| 이메일</th>
                  <th className='py-4 p-1 text-lg font-light rounded-tr-lg rounded-br-lg'>
                    | 연락처
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(50)].map((_, index) => (
                  <tr key={index}>
                    <td className='p2 pl-10'>{index + 1}</td>
                    <td className='p2 pl-4'>이승원</td>
                    <td className='p-2 pl-4'>lsw123@ssafy.com</td>
                    <td className='p-2 pl-4'>010-1234-5678</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {sendModalOpend && <SendEmailModal />}
    </div>
  );
};

export default DetailPage;
