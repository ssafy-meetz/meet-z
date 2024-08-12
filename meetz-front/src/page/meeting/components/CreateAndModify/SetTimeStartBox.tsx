import React, { useMemo } from 'react';
import useMeetingTimeStore from '../../../../zustand/useMeetingTimeStore';
import { timeOptions, customStyles } from './TimeOptions';
import Select from 'react-select';

type OptionDto = {
  value: string;
  label: string;
  isDisabled?: boolean;
}

const SetTimeStartBox = () => {
  const { selectedDate, selectedTime, setSelectedTime } = useMeetingTimeStore();

  // 현재 시간 가져오기
  const today = new Date();
  const formattedToday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  const currentTime = today.getTime(); // 현재 시간을 밀리초 단위로 가져옴

  const modifiedTimeOptions = useMemo(() => {
    if (selectedDate === formattedToday) {
      return timeOptions.map(option => {
        const [hours, minutes] = option.value.split(':').map(Number);
        const optionTime = new Date(today);
        optionTime.setHours(hours, minutes, 0, 0); // option의 시간 설정

        return {
          ...option,
          isDisabled: optionTime.getTime() < currentTime // 현재 시간보다 이전 시간은 비활성화
        };
      });
    }
    return timeOptions;
  }, [selectedDate, formattedToday, currentTime]);

  const handleChange = (option: OptionDto) => {
    setSelectedTime(option);
  }

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>시작 시간</span>
      </div>
      <div>
        <Select
          options={modifiedTimeOptions}
          value={selectedTime}
          onChange={(option) => option && handleChange(option)}
          styles={customStyles}
          className='text-xl w-40'
          placeholder='선택'
        />
      </div>
    </div>
  );
}

export default SetTimeStartBox;
