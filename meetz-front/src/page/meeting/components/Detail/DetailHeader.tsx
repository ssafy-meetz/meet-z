import { IoIosArrowDown } from "react-icons/io"
import { MeetingDetailDto } from "../../../../types/types"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { MdOutlineTimer } from "react-icons/md"
import { FaRegHourglass } from "react-icons/fa6"

const DetailHeader = ({ meetingData }: { meetingData: MeetingDetailDto | undefined }) => {

  const formatDate = (date: string): string => {
    return `${date.split(" ")[0].split("-")[1]}시 ${date.split(" ")[0].split("-")[1]}분`;
  }

  const convertToMinutesSeconds = (secondsStr: string): string => {
    const totalSeconds = parseInt(secondsStr, 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const convertTo12HourFormat = (time24: string): string => {
    let [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <header className='flex flex-col items-center border-b pb-7'>
      <div className='max-w-screen-xl w-screen px-24 '>
        <div className='flex items-center pt-20'>
          <button className='text-4xl font-medium flex items-center'>
            {meetingData?.meetingName}
            <IoIosArrowDown className='ml-5 text-[#ff4f5d]' />
          </button>
        </div>
        <div className='flex items-center justify-between mt-10'>
          <div className='flex gap-16'>
            <div className='flex items-center gap-4'>
              <IoCalendarNumberOutline className='text-4xl text-[#ff4f5d]' />
              <span className='text-3xl font-semibold'>{`${meetingData && formatDate(meetingData?.meetingStart)}`}</span>
              <span className='text-xl font-semibold'>{`${meetingData && convertTo12HourFormat(meetingData.meetingStart.split(" ")[1])} ~`}</span>
            </div>
            <div className='flex items-center gap-2 '>
              <MdOutlineTimer className='text-[#ff4f5d] text-xl' />
              <span className='text-xl font-semibold'>{`${meetingData?.meetingDuration && convertToMinutesSeconds(meetingData.meetingDuration + '')}분`}</span>
              <FaRegHourglass className='text-[#ff4f5d] text-xl' />
              <span className='text-xl font-semibold'>{`${meetingData?.term && convertToMinutesSeconds(meetingData.term)}초`}</span>
            </div>
          </div>
          <div>
            <button className='border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-white text-[#ff4f5d] rounded-3xl px-4 py-2'>
              미팅방 수정
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DetailHeader