import Select from 'react-select';
import useMeetingTimeStore from '../../../../zustand/useMeetingTimeStore';
import { durationOptions, customStyles } from './TimeOptions';


const SetTimeDuringBox = () => {
  const { selectedDuration, setSelectedDuration } = useMeetingTimeStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          진행 시간
        </span>
      </div>
      <div>
        <Select
          options={durationOptions}
          value={selectedDuration}
          onChange={(option) => setSelectedDuration(option)}
          styles={customStyles}
          className='text-xl'
          placeholder='선택'
        />
      </div>
    </div>
  )
}

export default SetTimeDuringBox