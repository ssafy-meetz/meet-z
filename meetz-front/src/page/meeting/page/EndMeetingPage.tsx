import MeetingList from '../components/MeetingList';
import MeetingListTitle from '../components/MeetingListTitle';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import { useEffect, useState } from 'react';
import getEndMeetingList from '../../../apis/meeting/getEndMeetingList';
import { useUserStore } from '../../../zustand/useUserStore';
import { MeetingDto } from '../../../types/types';

interface MeetingMonthData {
  [key: string]: {
    [key: string]: MeetingDto[];
  };
}

const EndMeetingPage = () => {
  const curMonth = (`0${new Date().getMonth() + 1}`).slice(-2);
  const beforeMonth = (`0${new Date().getMonth()}`).slice(-2);
  const [curMeetingData, setCurMeetingData] = useState<MeetingMonthData>({});
  const [beforetMeetingData, setBeforeMeetingData] = useState<MeetingMonthData>({});
  const { accessToken } = useUserStore();

  useCheckAuth('MANAGER');

  const fetchEndMeetingData = async () => {
    const { data } = await getEndMeetingList(accessToken);
    return data.month;
  };

  const transformMeetingData = (data: any, months: string[]) => {
    const transformedData: MeetingMonthData = {};
    months.forEach((month) => {
      if (data[month]) {
        transformedData[month] = {};
        Object.keys(data[month]).forEach((day) => {
          transformedData[month][day] = data[month][day];
        });
      }
    });
    return transformedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEndMeetingData();
      const curData = transformMeetingData(data, [curMonth]);
      const beforeData = transformMeetingData(data, [beforeMonth]);
      setCurMeetingData(curData);
      setBeforeMeetingData(beforeData);
    };

    fetchData();
  }, [accessToken, curMonth, beforeMonth]);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList isEnd={true} month={curMonth} meetings={curMeetingData[curMonth] || {}} />
      <MeetingList isEnd={true} month={beforeMonth} meetings={beforetMeetingData[beforeMonth] || {}} />
    </div>
  );
};

export default EndMeetingPage;
