import MeetingDayBox from "./MeetingDayBox";
import MeetingListItem from "./MeetingListItem";

interface MeetingListProps {
  month: number;
}

const MeetingList = ({ month }: MeetingListProps) => {

  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-screen flex pt-12 pb-10 '>
          <span className='text-[48px] font-bold px-24 '>{`${month}월`}</span>
        </div>
      </div>
      <div className='flex flex-col items-center py-20 bg-[#f9f9f9]'>
        <div className='max-w-screen-xl w-screen gap-12 flex flex-col justify-center'>
          <div className='flex px-24'>
            <MeetingDayBox />
            <div className='flex flex-col w-full gap-5'>
              <MeetingListItem />
              <MeetingListItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingList