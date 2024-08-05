import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MeetingListTitle = ({ company }: { company: string }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/meeting/create');
  }

  return (
    <div className='flex flex-col items-center '>
      <div className='max-w-screen-xl w-screen flex flex-col px-24 '>
        <div className='flex justify-between mt-16'>
          <h1 className='text-[32px] font-bold'>
            <span className='text-[#FF4F5D] mr-2'>{company || ""}</span> {pathname.includes('end') ? '완료된 미팅' : '예정된 미팅'}
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

export default React.memo(MeetingListTitle);
