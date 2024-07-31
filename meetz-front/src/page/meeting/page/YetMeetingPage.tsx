import { useEffect, useMemo, useState } from "react";
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";
import { useUserStore } from "../../../zustand/useUserStore";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";
import { MeetingDto } from "../../../types/types";
import getYetMeetingList from "../../../apis/meeting/getYetMeetingList";

const YetMeetingPage = () => {
  const curMonth = (`0${new Date().getMonth() + 1}`).slice(-2);
  const nextMonth = (`0${new Date().getMonth() + 2}`).slice(-2);
  const [curMeetingData, setCurMeetingData] = useState<MeetingDto[]>([]);
  const [nextMeetingData, setNextMeetingData] = useState<MeetingDto[]>([]);
  const { accessToken } = useUserStore();

  useCheckAuth('MANAGER');

  const fetchYetMeetingData = async () => {
    const { data } = await getYetMeetingList(accessToken);
    setCurMeetingData(data.month[curMonth] || []);
    setNextMeetingData(data.month[nextMonth] || []);
  };

  useEffect(() => {
    fetchYetMeetingData();
  }, [curMonth, nextMonth]);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList isEnd={false} month={+curMonth} meetings={curMeetingData} />
      <MeetingList isEnd={false} month={+nextMonth} meetings={nextMeetingData} />
    </div>
  );
}
export default YetMeetingPage;
