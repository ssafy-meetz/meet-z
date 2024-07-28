import useMeetingTimeStore from '../../../../zustand/useMeetingTimeStore';
import { timeOptions, customStyles } from './TimeOptions';
import Select from 'react-select';

const SetTimeStartBox = () => {
  const { selectedTime, setSelectedTime } = useMeetingTimeStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          시작 시간
        </span>
      </div>
      <div>
        <Select
          options={timeOptions}
          value={selectedTime}
          onChange={(option) => setSelectedTime(option)}
          styles={customStyles}
          className='text-xl'
          placeholder='선택'
        />
      </div>
    </div>
  )
}

export default SetTimeStartBox