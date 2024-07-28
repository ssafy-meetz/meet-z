import MeetingList from '../components/MeetingList';
import MeetingListTitle from '../components/MeetingListTitle';
import useMonth from '../../../hooks/meeting/useMonth';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';

const EndMeetingPage = () => {
  const { thisMonth, beforeMonth } = useMonth();

  useCheckAuth('MANAGER');

  //thisMonth를 기준으로 완료된 미팅 리스트 API 요청

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList month={thisMonth} />
      <MeetingList month={beforeMonth} />
    </div>
  );
};

export default EndMeetingPage;
