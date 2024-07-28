
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";
import useMonth from "../../../hooks/meeting/useMonth";
import MeetingList from "../components/MeetingList";
import MeetingListTitle from "../components/MeetingListTitle";

const YetMeetingPage = () => {
  const { thisMonth, nextMonth } = useMonth();

  useCheckAuth('MANAGER');

  return (
    <div className="mb-40 min-h-screen">
      <MeetingListTitle />
      <MeetingList month={thisMonth} />
      <MeetingList month={nextMonth} />
    </div>
  );
};

export default YetMeetingPage;
