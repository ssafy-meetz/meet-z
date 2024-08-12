import Select from 'react-select';
import useMeetingTimeStore from '../../../../zustand/useMeetingTimeStore';
import { breakOptions, customStyles } from './TimeOptions';

const SetTimeBreakBox = () => {
  const { selectedBreak, setSelectedBreak } = useMeetingTimeStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          쉬는 시간
        </span>
      </div>
      <div>
        <Select
          options={breakOptions}
          value={selectedBreak}
          onChange={(option) => {
            setSelectedBreak(option)
          }}
          styles={customStyles}
          className='text-xl w-40'
          placeholder='선택'
        />
      </div>
    </div>
  )
}

export default SetTimeBreakBox