import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';

const SetMeetingNameBox = () => {
  const { meetingName, setMeetingName } = useMeetingSettingStore();

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>미팅 이름</span>
      </div>
      <input
        type='text'
        value={meetingName}
        className='focus:outline-none focus:border-[#FF4F5D] border-b hover:border-[#FF4F5D] text-xl font-semibold'
        placeholder='입력'
        onChange={(e) => setMeetingName(e.target.value)}
      />
    </div>
  );
};

export default SetMeetingNameBox;
