export const timeOptions = [
  { value: '', label: '시간 선택' },
  { value: '08:00', label: '08:00 am' },
  { value: '08:30', label: '08:30 am' },
  { value: '09:00', label: '09:00 am' },
  { value: '09:30', label: '09:30 am' },
  { value: '10:00', label: '10:00 am' },
  { value: '10:30', label: '10:30 am' },
  { value: '11:00', label: '11:00 am' },
  { value: '11:30', label: '11:30 am' },
  { value: '12:00', label: '12:00 pm' },
  { value: '12:30', label: '12:30 pm' },
  { value: '13:00', label: '01:00 pm' },
  { value: '13:30', label: '01:30 pm' },
  { value: '14:00', label: '02:00 pm' },
  { value: '14:30', label: '02:30 pm' },
  { value: '15:00', label: '03:00 pm' },
  { value: '15:30', label: '03:30 pm' },
  { value: '16:00', label: '04:00 pm' },
  { value: '16:30', label: '04:30 pm' },
  { value: '17:00', label: '05:00 pm' },
  { value: '17:30', label: '05:30 pm' },
  { value: '18:00', label: '06:00 pm' },
  { value: '18:30', label: '06:30 pm' },
  { value: '19:00', label: '07:00 pm' },
  { value: '19:30', label: '07:30 pm' },
  { value: '20:00', label: '08:00 pm' },
  { value: '20:30', label: '08:30 pm' },
  { value: '21:00', label: '09:00 pm' },
  { value: '21:30', label: '09:30 pm' },
]

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

export const breakOptions = [
  { value: '5', label: '5초' },
  { value: '10', label: '10초' },
  { value: '20', label: '20초' },
  { value: '30', label: '30초' },
  { value: '60', label: '1분' },
  { value: '90', label: '1분30초' },
  { value: '120', label: '2분' },
  { value: '150', label: '2분30초' },
  { value: '180', label: '3분' },
  { value: '300', label: '5분' },
];

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
