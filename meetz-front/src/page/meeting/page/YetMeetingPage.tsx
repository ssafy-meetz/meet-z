import { useEffect, useState } from "react";
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";
import { useUserStore } from "../../../zustand/useUserStore";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";
import getYetMeetingList from "../../../apis/meeting/getYetMeetingList";
import { MeetingDto } from "../../../types/types";

interface MeetingMonthData {
  [key: string]: {
    [key: string]: MeetingDto[];
  };
}

const YetMeetingPage = () => {
  const curMonth = (`0${new Date().getMonth() + 1}`).slice(-2);
  const nextMonth = (`0${new Date().getMonth() + 2}`).slice(-2);
  const [curMeetingData, setCurMeetingData] = useState<MeetingMonthData>({});
  const [nextMeetingData, setNextMeetingData] = useState<MeetingMonthData>({});
  const { accessToken } = useUserStore();

  // useCheckAuth('MANAGER');

  const fetchYetMeetingData = async () => {
    const { data } = await getYetMeetingList(accessToken);
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
      const data = await fetchYetMeetingData();
      const curData = transformMeetingData(data, [curMonth]);
      const nextData = transformMeetingData(data, [nextMonth]);
      setCurMeetingData(curData);
      setNextMeetingData(nextData);
      console.log("Current Month Data:", curData);
      console.log("Next Month Data:", nextData);
    };

    fetchData();
  }, [accessToken, curMonth, nextMonth]);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList isEnd={false} month={curMonth} meetings={curMeetingData[curMonth] || {}} />
      <MeetingList isEnd={false} month={nextMonth} meetings={nextMeetingData[nextMonth] || {}} />
    </div>
  );
}

export default YetMeetingPage;
