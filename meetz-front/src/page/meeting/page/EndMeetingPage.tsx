import { useEffect, useState, useMemo, useCallback } from 'react'; import getEndMeetingList from '../../../apis/meeting/getEndMeetingList';
import { MeetingDto } from '../../../types/types';
import fetchUserData from '../../../lib/fetchUserData';
import MeetingListTitle from '../components/YetEndList/MeetingListTitle';
import MeetingList from '../components/YetEndList/MeetingList';

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
  const { accessToken } = fetchUserData();
  const [meetingCompany, setMeetingCompany] = useState("");

  const fetchEndMeetingData = useCallback(async () => {
    const { data } = await getEndMeetingList(accessToken || "");
    return data;
  }, [accessToken]);

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
      const { month, company } = await fetchEndMeetingData();
      setMeetingCompany(company);
      const curData = transformMeetingData(month, [curMonth]);
      const beforeData = transformMeetingData(month, [beforeMonth]);
      setCurMeetingData(curData);
      setBeforeMeetingData(beforeData);
    };

    fetchData();
  }, [accessToken, curMonth, beforeMonth]);

  const memoizedMeetingCompany = useMemo(() => meetingCompany, [meetingCompany]);

  return (
    <div className='mb-40'>
      <MeetingListTitle company={memoizedMeetingCompany} />
      <MeetingList isEnd={true} month={curMonth} meetings={curMeetingData[curMonth] || {}} />
      <MeetingList isEnd={true} month={beforeMonth} meetings={beforetMeetingData[beforeMonth] || {}} />
    </div>
  );
};

export default EndMeetingPage;
