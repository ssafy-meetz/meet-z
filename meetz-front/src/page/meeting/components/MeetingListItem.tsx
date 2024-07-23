const MeetingListItem = () => {
  const handleButtonClick = () => {
    alert('버튼이 클릭되었습니다!');
  };

  return (
    <div className='p-4 bg-[#FFFFFF] rounded-2xl flex justify-between items-center'>
      <div>
        <div className='text-[20px] font-semibold'>
          우주최강 이승원 앨범 출시 팬싸인회
        </div>
        <div className='text-[20px] font-medium text-[#7d7d7d]'>
          14:00 ~
        </div>
      </div>
      <div className='text-right'>
        <div className='text-[20px] text-[#7d7d7d]'>
          참여인원 : 50명 예정
        </div>
        <button
          onClick={handleButtonClick}
          className='mt-2 bg-transparent border border-[#FF4F5D] text-[#FF4F5D] py-1 px-2 rounded-full transition duration-200 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105'
        >
          이벤트 수정
        </button>
      </div>
    </div>
  )
}

export default MeetingListItem