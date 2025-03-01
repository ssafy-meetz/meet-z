import { useLocation, useNavigate } from 'react-router-dom';
import { MeetingDto } from '../../../../types/types';

const MeetingListItem = ({ meeting }: { meeting: MeetingDto }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const clickRouter = (to: string) => {
    let path = '/meeting/' + to + `/${meeting.meetingId}`;
    navigate(path);
  };

  return (
    <div className='p-4 bg-[#FFFFFF] rounded-2xl flex justify-between items-center w-full'>
      <div className='flex flex-col gap-2'>
        <div
          onClick={() =>
            clickRouter(pathname.includes('end') ? 'monitor' : 'detail')
          }
          className='text-[22px] font-semibold hover:text-[#FF4F5D] cursor-pointer active:scale-95 duration-100 ease-in-out transform hover:scale-105'
        >
          {meeting.meetingName}
        </div>
        <div className='text-[20px] font-medium text-[#7d7d7d] cursor-default'>
          {`${meeting.meetingStart.split(' ')[1]} ~${meeting.meetingEnd.split(' ')[0].split('-')[0] === '0001' ? '' : meeting.meetingEnd.split(' ')[1]}`}
        </div>
      </div>
      <div className='text-right'>
        <div className='text-[20px] text-[#7d7d7d] cursor-default'>
          {meeting.meetingEnd.split(' ')[0].split('-')[0] !== '0001'
            ? `참여인원 : ${meeting.cnt}명`
            : `참여인원 : ${meeting.cnt}명 예정`}
        </div>
        {meeting.meetingEnd.split(' ')[0].split('-')[0] !== '0001' ? (
          ''
        ) : (
          <button
            onClick={() => clickRouter('modify')}
            className='mt-2 bg-transparent active:scale-95 border border-[#FF4F5D] text-[#FF4F5D] py-1 px-2 rounded-full transition duration-200 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105'
          >
            미팅 수정
          </button>
        )}
      </div>
    </div>
  );
};

export default MeetingListItem;
