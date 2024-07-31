import MeetingList from '../components/MeetingList';
import MeetingListTitle from '../components/MeetingListTitle';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import { useEffect, useState } from 'react';
import getEndMeetingList from '../../../apis/meeting/getEndMeetingList';
import { useUserStore } from '../../../zustand/useUserStore';
import { MeetingDto } from '../../../types/types';

const EndMeetingPage = () => {
  const curMonth = (`0${new Date().getMonth() + 1}`).slice(-2);
  const beforeMonth = (`0${new Date().getMonth()}`).slice(-2);
  const [curMeetingData, setCurMeetingData] = useState<MeetingDto[]>([]);
  const [beforetMeetingData, setBeforeMeetingData] = useState<MeetingDto[]>([]);
  const { accessToken } = useUserStore();

  useCheckAuth('MANAGER');

  const fetchEndMeetingData = async () => {
    try {
      const { data } = await getEndMeetingList(accessToken);
      setCurMeetingData(data.month[curMonth] || []);
      setBeforeMeetingData(data.month[beforeMonth] || []);
    } catch (error) {
      alert("에러!")
    }
  };

  useEffect(() => {
    fetchEndMeetingData();
  }, [curMonth, beforeMonth]);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList isEnd={true} month={+curMonth} meetings={curMeetingData} />
      <MeetingList isEnd={true} month={+beforeMonth} meetings={beforetMeetingData} />
    </div>
  );
};

export default EndMeetingPage;
