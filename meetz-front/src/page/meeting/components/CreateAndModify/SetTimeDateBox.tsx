import DatePicker from "react-datepicker"
import useMeetingTimeStore from "../../../../zustand/useMeetingTimeStore";

const SetTimeDateBox = () => {
  const { selectedDate, setSelectedDate } = useMeetingTimeStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>날짜</span>
      </div>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat='yyyy-MM-dd'
          className='text-xl focus:outline-none cursor-pointer'
          placeholderText='날짜 선택 '
        />
      </div>
    </div>
  )
}

export default SetTimeDateBox