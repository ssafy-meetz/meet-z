import { useState } from "react";
import { StarDto } from "../../../../types/types"
import { HiOutlineClipboardDocumentList, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { CopyToClipboard } from "react-copy-to-clipboard";


const DetailRoomList = ({ starList }: { starList: StarDto[] | undefined }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const clickHandler = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  }

  return (
    <div className='max-w-screen-xl w-screen px-24'>
      <div className='py-12'>
        <span className='text-2xl font-semibold'>방 목록</span>
      </div>
      <div className='flex gap-8 flex-wrap justify-center'>
        {starList && starList.map((star) => (
          <div
            key={star.email}
            className='min-w-64 p-8 flex flex-col gap-3 border rounded-3xl border-[#ff4f5d] bg-white shadow-lg'
          >
            <div className='flex justify-between'>
              <div className="w-[30px] h-[30px]"></div>
              <span className='text-2xl text-[#ff4f5d]'>
                {star.name}
              </span>
              <CopyToClipboard
                text={`이메일 : ${star.email}\n비밀번호 : ${star.password}`}
                onCopy={() => alert("스타 이메일/비밀번호가 복사되었습니다.")}
              >
                <div onClick={clickHandler} className="mt-auto flex justify-center items-center w-[30px] h-[30px] cursor-pointer rounded-full transition-colors duration-200 text-gray-400 hover:text-[#ff4f5d] active:scale-110" >
                  {!isClicked ? <HiOutlineClipboardDocumentList className="w-[23px] h-[23px]" /> :
                    <HiOutlineClipboardDocumentCheck className="w-[23px] h-[23px]" />}
                </div>
              </CopyToClipboard>
            </div>
            <div className='flex flex-col'>
              <span>이메일 : {star.email}</span>
              <span>비밀번호: {star.password}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailRoomList