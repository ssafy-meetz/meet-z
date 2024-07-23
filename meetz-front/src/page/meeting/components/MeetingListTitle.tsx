const MeetingListTitle = () => {
  const handleButtonClick = () => {
    //미팅 생성 페이지로 이동시키기
    alert('버튼이 클릭되었습니다!');
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen flex flex-col'>
        <div className='flex justify-between mt-16'>
          <h1 className='text-[32px] font-bold'>
            <span className='text-[#FF4F5D] mr-2'>SSAFY</span> 일정관리
          </h1>
          <button
            onClick={handleButtonClick}
            className='bg-[#FF4F5D] text-white p-1 px-4 text-[20px] rounded-full'
          >
            팬싸인회 생성
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingListTitle