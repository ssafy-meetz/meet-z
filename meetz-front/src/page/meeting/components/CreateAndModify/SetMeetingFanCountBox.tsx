import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore"

const SetMeetingFanCountBox = () => {
  const { notBlackList } = useMeetingSettingStore();
  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          참석할 팬 인원
        </span>
      </div>
      <div>
        <span className='text-xl'>{notBlackList.length}</span>
      </div>
    </div>
  )
}

export default SetMeetingFanCountBox