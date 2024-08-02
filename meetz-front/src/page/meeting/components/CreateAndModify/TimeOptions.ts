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
  { value: '60', label: '1분' },
  { value: '90', label: '1분 30초' },
  { value: '120', label: '2분' },
  { value: '150', label: '2분 30초' },
  { value: '180', label: '3분' },
  { value: '210', label: '3분 30초' },
  { value: '240', label: '4분' },
  { value: '270', label: '4분 30초' },
  { value: '300', label: '5분' },
  { value: '330', label: '5분 30초' },
  { value: '360', label: '6분' },
  { value: '490', label: '6분 30초' },
  { value: '420', label: '7분' },
  { value: '450', label: '7분 30초' },
  { value: '480', label: '8분' },
  { value: '510', label: '8분 30초' },
  { value: '540', label: '9분' },
  { value: '570', label: '9분 30초' },
  { value: '600', label: '10분' },
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
