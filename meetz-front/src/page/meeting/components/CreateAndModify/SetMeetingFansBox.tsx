const SetMeetingFansBox = () => {

  const handleClick = () => {
    alert('버튼 클릭');
  };

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          당첨 팬 목록 관리
        </span>
      </div>
      <div>
        <button
          onClick={handleClick}
          className='bg-[#ff4f5d] text-white rounded-xl px-3 py-1'>
          팬 목록 관리
        </button>
      </div>
    </div>
  )
}

export default SetMeetingFansBox