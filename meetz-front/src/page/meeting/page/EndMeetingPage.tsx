import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";
import useMonth from "../../../hooks/meeting/useMonth";


const EndMeetingPage = () => {
  const { thisMonth, beforeMonth } = useMonth();

  //thisMonth를 기준으로 완료된 미팅 리스트 API 요청


  return (
    <div className="mb-[160px]">
      <MeetingListTitle />
      <MeetingList month={thisMonth} />
      <MeetingList month={beforeMonth} />
    </div>
  );
};

export default EndMeetingPage;
