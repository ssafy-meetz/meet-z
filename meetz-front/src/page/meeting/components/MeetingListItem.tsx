import { useLocation, useNavigate } from "react-router-dom"

const MeetingListItem = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const clickRouter = (to: string) => {
    let path = '/meeting/' + to + '/3';
    navigate(path);
  }

  return (
    <div className='p-4 bg-[#FFFFFF] rounded-2xl flex justify-between items-center'>
      <div className="flex flex-col">
        <div
          onClick={() => clickRouter(pathname.includes('end') ? 'monitor' : 'detail')}
          className='text-[20px] font-semibold hover:text-[#FF4F5D] cursor-pointer'>
          우주최강 이승원 앨범 출시 팬싸인회
        </div>
        <div className='text-[20px] font-medium text-[#7d7d7d] cursor-default'>
          14:00 ~
        </div>
      </div>
      <div className='text-right'>
        <div className='text-[20px] text-[#7d7d7d] cursor-default'>
          참여인원 : 50명 예정
        </div>
        <button
          onClick={() => clickRouter('modify')}
          className='mt-2 bg-transparent border border-[#FF4F5D] text-[#FF4F5D] py-1 px-2 rounded-full transition duration-200 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105'
        >
          이벤트 수정
        </button>
      </div>
    </div>
  )
}

export default MeetingListItem