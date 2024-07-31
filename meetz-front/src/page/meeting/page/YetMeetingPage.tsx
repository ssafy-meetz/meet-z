import { useEffect, useMemo, useState } from "react";
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";
import { useUserStore } from "../../../zustand/useUserStore";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";
import { MeetingDto } from "../../../types/types";
import getYetMeetingList from "../../../apis/meeting/getYetMeetingList";

const YetMeetingPage = () => {
  const [meetingData, setMeetingData] = useState<MeetingDto[]>([
    {
      "meetingId": 1,
      "meetingName": "이승원데뷔1주년기념팬미팅",
      "meetingStart": "2024-08-16 13:30",
      "meetingEnd": "",
      "cnt": 5 //5명참여
    },
    {
      "meetingId": 3,
      "meetingName": "이승원 음방 1위 기념 팬미팅",
      "meetingStart": "2024-08-17 15:00",
      "meetingEnd": "",
      "cnt": 10
    },
    {
      "meetingId": 4,
      "meetingName": "이승원 정규앨범 3집 팬미팅",
      "meetingStart": "2024-08-29 16:30",
      "meetingEnd": "",
      "cnt": 100
    }
  ]);
  const { accessToken } = useUserStore();

  useCheckAuth('MANAGER');

  const fetchYetMeetingData = async () => {
    const { data } = await getYetMeetingList(accessToken);
    setMeetingData(data.meetingList);
  };

  const sortedMeetingData = useMemo(() => {
    if (meetingData && meetingData.length > 0) {
      return [...meetingData].sort((a, b) => new Date(a.meetingStart).getTime() - new Date(b.meetingStart).getTime());
    }
    return [];
  }, [meetingData]);

  useEffect(() => {
    // fetchYetMeetingData();
  }, []);

  return (
    <div className='mb-40'>
      <MeetingListTitle />
      <MeetingList meetings={sortedMeetingData} />
    </div>
  );
}
export default YetMeetingPage;
