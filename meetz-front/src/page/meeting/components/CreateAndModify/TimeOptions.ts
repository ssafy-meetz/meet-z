// src/utils/timeOptions.ts

export const timeOptions = [
  { value: '08:00 am', label: '08:00 am' },
  { value: '08:30 am', label: '08:30 am' },
  { value: '09:00 am', label: '09:00 am' },
  { value: '09:30 am', label: '09:30 am' },
  { value: '10:00 am', label: '10:00 am' },
  { value: '10:30 am', label: '10:30 am' },
  { value: '11:00 am', label: '11:00 am' },
  { value: '11:30 am', label: '11:30 am' },
  { value: '12:00 pm', label: '12:00 pm' },
  { value: '12:30 pm', label: '12:30 pm' },
  { value: '01:00 pm', label: '01:00 pm' },
  { value: '01:30 pm', label: '01:30 pm' },
  { value: '02:00 pm', label: '02:00 pm' },
  { value: '02:30 pm', label: '02:30 pm' },
  { value: '03:00 pm', label: '03:00 pm' },
  { value: '03:30 pm', label: '03:30 pm' },
  { value: '04:00 pm', label: '04:00 pm' },
  { value: '04:30 pm', label: '04:30 pm' },
  { value: '05:00 pm', label: '05:00 pm' },
  { value: '05:30 pm', label: '05:30 pm' },
  { value: '06:00 pm', label: '06:00 pm' },
  { value: '06:30 pm', label: '06:30 pm' },
  { value: '07:00 pm', label: '07:00 pm' },
  { value: '07:30 pm', label: '07:30 pm' },
  { value: '08:00 pm', label: '08:00 pm' },
  { value: '08:30 pm', label: '08:30 pm' },
  { value: '09:00 pm', label: '09:00 pm' },
  { value: '09:30 pm', label: '09:30 pm' },
  { value: '10:00 pm', label: '10:00 pm' },
];

export const durationOptions = [
  { value: '1:00', label: '1분' },
  { value: '1:30', label: '1분 30초' },
  { value: '2:00', label: '2분' },
  { value: '2:30', label: '2분 30초' },
  { value: '3:00', label: '3분' },
  { value: '3:30', label: '3분 30초' },
  { value: '4:00', label: '4분' },
  { value: '4:30', label: '4분 30초' },
  { value: '5:00', label: '5분' },
  { value: '5:30', label: '5분 30초' },
  { value: '6:00', label: '6분' },
  { value: '6:30', label: '6분 30초' },
  { value: '7:00', label: '7분' },
  { value: '7:30', label: '7분 30초' },
  { value: '8:00', label: '8분' },
  { value: '8:30', label: '8분 30초' },
  { value: '9:00', label: '9분' },
  { value: '9:30', label: '9분 30초' },
  { value: '10:00', label: '10분' },
];


export const breakOptions = Array.from({ length: 13 }, (_, i) => {
  const seconds = i * 10;
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  if (seconds === 0) {
    return {
      value: '0:00',
      label: 'X',
    };
  }

  return {
    value: `${minutes}:${remainderSeconds.toString().padStart(2, '0')}`,
    label: `${minutes > 0 ? `${minutes}분 ` : ''}${remainderSeconds > 0 ? `${remainderSeconds}초` : ''}`.trim(),
  };
});

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '10px', // 둥근 경계
    
    boxShadow: 'none',
    cursor: 'pointer', // 커서 포인터 추가
    '&:hover': {
      borderColor: '#FF4F5D'
    }
  }),
  option: (provided: any) => ({
    ...provided,
    borderRadius: '5px',
    cursor: 'pointer' // 커서 포인터 추가
  }),
  indicatorSeparator: () => ({
    display: 'none' // 시간과 화살표 가운데 선 제거
  })
};
