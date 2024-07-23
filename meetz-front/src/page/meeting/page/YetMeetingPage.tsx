import useMonth from "../../../hooks/meeting/useMonth";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";

const YetMeetingPage = () => {
  const { thisMonth, nextMonth } = useMonth();



  return (
    <div className="mb-[160px]">
      <MeetingListTitle />
      <MeetingList month={thisMonth} />
      <MeetingList month={nextMonth} />
    </div>
  );
};

export default YetMeetingPage;
