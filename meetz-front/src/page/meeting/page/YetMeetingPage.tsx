import { useEffect, useState } from "react";
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";
import getYetMeetingList from "../../../apis/meeting/getYetMeetingList";
import { MeetingDto } from "../../../types/types";
import fetchUserData from "../../../lib/fetchUserData";

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
  const { accessToken } = fetchUserData();
  const [meetingCompay, setMeetingCompany] = useState("");

  useCheckAuth('MANAGER');

  const fetchYetMeetingData = async () => {
    const { data } = await getYetMeetingList(accessToken || "");
    return data;
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
      const { month, company } = await fetchYetMeetingData();
      setMeetingCompany(company);
      const curData = transformMeetingData(month, [curMonth]);
      const nextData = transformMeetingData(month, [nextMonth]);
      setCurMeetingData(curData);
      setNextMeetingData(nextData);
    };

    fetchData();
  }, [accessToken, curMonth, nextMonth]);

  return (
    <div className='mb-40'>
      <MeetingListTitle company={meetingCompay} />
      <MeetingList isEnd={false} month={curMonth} meetings={curMeetingData[curMonth] || {}} />
      <MeetingList isEnd={false} month={nextMonth} meetings={nextMeetingData[nextMonth] || {}} />
    </div>
  );
}

export default YetMeetingPage;
