

const EndMeetingPage = () => {

  const handleButtonClick = () => {
    alert('버튼이 클릭되었습니다!');
  };

  return (
    <>
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
      <div className='flex flex-col items-center '>
        <div className='max-w-screen-xl w-screen flex pt-12 pb-10 '>
          <span className='text-[48px] font-bold '>7월</span>
        </div>
      </div>
      <div className='flex flex-col items-center py-20 bg-[#f9f9f9]'>
        <div className='max-w-screen-xl w-screen gap-12 flex flex-col justify-center'>
          <div className='flex'>
            <div className='text-center mr-6'>
              <div className='text-[36px] font-bold whitespace-nowrap'>
                16일
              </div>
              <div className='text-[32px] font-semibold text-[#7d7d7d]'>
                Tue
              </div>
            </div>
            <div className='flex flex-col w-full gap-5'>
              <div className=' p-4 bg-[#FFFFFF] rounded-2xl  flex justify-between items-center'>
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
            </div>
          </div>

          <div className='flex'>
            <div className='text-center mr-6'>
              <div className='text-[36px] font-bold whitespace-nowrap'>
                17일
              </div>
              <div className='text-[32px] font-semibold text-[#7d7d7d]'>
                Wed
              </div>
            </div>
            <div className='flex flex-col w-full gap-5'>
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
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center '>
        <div className='max-w-screen-xl w-screen flex pt-12 pb-10 '>
          <span className='text-[48px] font-bold '>8월</span>
        </div>
      </div>
      <div className='flex flex-col items-center py-20 bg-[#f9f9f9]'>
        <div className='max-w-screen-xl w-screen gap-12 flex flex-col justify-center'>
          <div className='flex'>
            <div className='text-center mr-6'>
              <div className='text-[36px] font-bold whitespace-nowrap'>
                16일
              </div>
              <div className='text-[32px] font-semibold text-[#7d7d7d]'>
                Tue
              </div>
            </div>
            <div className='flex flex-col w-full gap-5'>
              <div className=' p-4 bg-[#FFFFFF] rounded-2xl  flex justify-between items-center'>
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
            </div>
          </div>

          <div className='flex'>
            <div className='text-center mr-6'>
              <div className='text-[36px] font-bold whitespace-nowrap'>
                17일
              </div>
              <div className='text-[32px] font-semibold text-[#7d7d7d]'>
                Wed
              </div>
            </div>
            <div className='flex flex-col w-full gap-5'>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndMeetingPage;
