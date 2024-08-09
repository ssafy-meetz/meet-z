import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';

const SetMeetingFansBox = () => {
  const { setIsOpenModal } = useMeetingSettingStore();

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `/fanlist.xlsx`;
    link.download = 'fanlist.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          당첨 팬 목록 관리
        </span>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={setIsOpenModal}
          className='bg-[#ff4f5d] active:scale-95 duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition text-white rounded-xl px-3 py-1'
        >
          팬 목록 관리
        </button>
        <button
          onClick={downloadFile}
          className=' text-[#ff4f5d] active:scale-95 rounded-xl border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-white  px-3 py-1'
        >
          양식 다운로드
        </button>
      </div>
    </div>
  );
};

export default SetMeetingFansBox;
