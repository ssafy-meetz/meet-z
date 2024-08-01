import { useMemo } from "react";

const MeetingDayBox = ({ date }: { date: string }) => {
  const newDay = useMemo(() => {
    return new Date(date).toString().split(" ")[2];
  }, [date]);
  const newWeek = useMemo(() => {
    return new Date(date).toString().slice(0, 3);
  }, [date]);
  return (
    <div className='text-center flex flex-col items-center'>
      <div className='text-[28px] font-bold whitespace-nowrap'>
        {newDay}일
      </div>
      <div className='text-[28px] font-semibold text-[#7d7d7d]'>
        {newWeek}
      </div>
    </div>
  )
}

export default MeetingDayBox;
