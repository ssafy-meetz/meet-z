import { useEffect, useState } from "react";
import MeetingDayBox from "./MeetingDayBox";
import MeetingListItem from "./MeetingListItem";
import { MeetingDto } from "../../../../types/types";

interface MeetingMonthData {
  [key: string]: MeetingDto[];
}

interface MeetingListProps {
  isEnd: boolean;
  month: string;
  meetings: MeetingMonthData;
}

const MeetingList = ({ isEnd, month, meetings }: MeetingListProps) => {
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    if (meetings) {
      setDays(Object.keys(meetings).sort((a, b) => +b - +a));
    }
  }, [meetings]);

  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-screen flex pt-12 pb-10'>
          <span className='text-[48px] font-bold px-24'>{month}월</span>
        </div>
      </div>
      <div className='flex flex-col items-center py-20 bg-[#f9f9f9]'>
        <div className='max-w-screen-xl w-screen gap-12 flex flex-col justify-center'>
          <div className='flex flex-col gap-10 px-24'>
            {days.length === 0 ? (
              <span className="flex justify-center items-center font-bold text-gray-400 text-3xl cursor-default">
                {isEnd ? '완료' : '예정'}된 미팅이 없습니다.
              </span>
            ) : (
              days.map(day => (
                <div key={day} className="flex flex-col gap-5">
                  {meetings[day].map((dayMeets: MeetingDto, index: number) => (
                    <div className="flex items-center gap-12" key={dayMeets.meetingId}>
                      {index === 0 ? (
                        <div className="w-20">
                          <MeetingDayBox date={new Date(dayMeets.meetingStart).toString()} />
                        </div>
                      ) : (
                        <div className="w-20">
                          {/* 빈 공간을 유지하기 위한 요소 */}
                        </div>
                      )}
                      <div className='flex flex-col w-full gap-6'>
                        <MeetingListItem key={dayMeets.meetingId} meeting={dayMeets} />
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingList;
