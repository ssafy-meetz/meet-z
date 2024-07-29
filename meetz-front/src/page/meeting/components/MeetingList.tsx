import { MeetingDto } from "../../../types/types";
import MeetingDayBox from "./MeetingDayBox";
import MeetingListItem from "./MeetingListItem";

interface MeetingListProps {
  meetings: MeetingDto[];
}

const MeetingList = ({ meetings }: MeetingListProps) => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-screen flex pt-12 pb-10 '>
          <span className='text-[48px] font-bold px-24 '>{meetings && meetings.length > 0 ? `${new Date(meetings[0].meetingStart).getMonth() + 1}월` : '7월'}</span>
        </div>
      </div>
      <div className='flex flex-col items-center py-20 bg-[#f9f9f9]'>
        <div className='max-w-screen-xl w-screen gap-12 flex flex-col justify-center'>
          <div className='flex flex-col gap-10 px-24'>
            {meetings.map(meet => {
              return (
                <div className="flex" key={meet.meetingId}>
                  <MeetingDayBox date={new Date(meet.meetingStart).toString()} />
                  <div className='flex flex-col w-full gap-5'>
                    {/* 같은 날짜 있으면 여러개 보이게 수정해야 함 */}
                    <MeetingListItem key={meet.meetingId} meeting={meet} />
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingList;
