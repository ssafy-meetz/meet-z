import MeetingList from '../components/MeetingList';
import MeetingListTitle from '../components/MeetingListTitle';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import { useEffect, useMemo, useState } from 'react';
import getEndMeetingList from '../../../apis/meeting/getEndMeetingList';
import { useUserStore } from '../../../zustand/useUserStore';
import { MeetingDto } from '../../../types/types';

const EndMeetingPage = () => {
  const [meetingData, setMeetingData] = useState<MeetingDto[]>([
    {
      "meetingId": 1,
      "meetingName": "강창우 생일 축하 파티",
      "meetingStart": "2024-07-15 13:30",
      "meetingEnd": "2024-07-15 15:30",
      "cnt": 5 //5명참여
    },
    {
      "meetingId": 2,
      "meetingName": "이승원 짜파게티 100인분 먹방",
      "meetingStart": "2024-07-15 17:30",
      "meetingEnd": "2024-07-15 18:30",
      "cnt": 5 //5명참여
    },
    {
      "meetingId": 3,
      "meetingName": "손다인 음방 1위 기념 팬미팅",
      "meetingStart": "2024-07-17 15:00",
      "meetingEnd": "2024-07-17 17:00",
      "cnt": 10
    },
    {
      "meetingId": 4,
      "meetingName": "서민수 위험천만 모터쇼",
      "meetingStart": "2024-07-29 16:30",
      "meetingEnd": "2024-07-29 18:30",
      "cnt": 100
    },
    {
      "meetingId": 5,
      "meetingName": "신민경 침대에서 낙하 라이브",
      "meetingStart": "2024-06-29 16:30",
      "meetingEnd": "2024-06-29 18:30",
      "cnt": 100
    }
  ]);
  const { accessToken } = useUserStore();

  useCheckAuth('MANAGER');

  const fetchEndMeetingData = async () => {
    const { data } = await getEndMeetingList(accessToken);
    setMeetingData(data.meetingList);
  };

  const sortedMeetingData = useMemo(() => {
    if (meetingData && meetingData.length > 0) {
      return [...meetingData].sort((a, b) => new Date(a.meetingStart).getTime() - new Date(b.meetingStart).getTime());
    }
    return [];
  }, [meetingData]);

  useEffect(() => {
    // fetchEndMeetingData();
  }, []);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList meetings={sortedMeetingData} />
    </div>
  );
};

export default EndMeetingPage;
