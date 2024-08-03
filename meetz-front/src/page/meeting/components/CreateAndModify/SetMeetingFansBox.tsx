import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const SetMeetingFansBox = () => {
  const { setIsOpenModal } = useMeetingSettingStore();

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `src/assets/fan_list.xlsx`;
    link.download = 'fan_list.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          당첨 팬 목록 관리
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={setIsOpenModal}
          className='bg-[#ff4f5d] text-white rounded-xl px-3 py-1'>
          팬 목록 관리
        </button>
        <button
          onClick={downloadFile}
          className='border-[#ff4f5d] border border-[] text-[#ff4f5d] rounded-xl px-3 py-1'>
          양식 다운로드
        </button>
      </div>
    </div>
  )
}

export default SetMeetingFansBox