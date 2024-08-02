import useMeetingTimeStore from "../../../../zustand/useMeetingTimeStore";

const SetTimeDateBox = () => {
  const { setSelectedDate } = useMeetingTimeStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>날짜</span>
      </div>
      <div>
        <input className='w-40' type="date" onChange={(e) => setSelectedDate(new Date(e.target.value))} />
      </div>
    </div>
  );
};

export default SetTimeDateBox;
