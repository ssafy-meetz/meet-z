import React from 'react';
import useMeetingTimeStore from '../../../../zustand/useMeetingTimeStore';

const SetTimeDateBox: React.FC = () => {
  const { setSelectedDate, selectedDate } = useMeetingTimeStore();

  // 오늘 날짜를 YYYY-MM-DD 형식으로 얻기
  const today = new Date();
  const formattedToday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const sDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

    // 선택된 날짜가 오늘보다 이전인지 확인 (오늘 날짜는 포함)
    if (date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      alert('현재 날짜 이전의 날짜는 선택할 수 없습니다.');
      return;
    }

    setSelectedDate(sDate);
  }

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>날짜</span>
      </div>
      <div>
        <input
          value={selectedDate || ''}
          className='w-40 cursor-text'
          type='date'
          onChange={dateChangeHandler}
          min={formattedToday}  // 오늘 날짜 이전을 선택할 수 없도록 설정
        />
      </div>
    </div>
  );
};

export default SetTimeDateBox;
