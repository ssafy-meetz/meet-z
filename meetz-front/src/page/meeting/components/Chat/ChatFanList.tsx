import { useNavigate } from "react-router-dom";
import { ChatFanDto } from "../../../../types/types";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ChatFanListItem from "./ChatFanListItem";

const ChatFanList = ({ setSelectedFan, fanList }: { setSelectedFan: React.Dispatch<ChatFanDto | null>; fanList: ChatFanDto[] }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const id = 1;
    navigate(`/meeting/detail/${id}`);
  };

  return (
    <div className='w-80 h-full border-r-4 overflow-y-hidden'>
      <div className='w-full h-20 flex flex-col justify-center items-center border-b-4'>
        <div className='flex items-center w-full pl-9 gap-11'>
          <button
            className='hover:text-[#ff4f5d]'
            onClick={handleButtonClick}
          >
            <HiOutlineArrowLeft className='w-[35px] h-[35px]' />
          </button>
          <span className='text-xl font-medium'>채팅 목록</span>
        </div>
      </div>

      {/* 채팅 버튼 목록 */}
      <ChatFanListItem setSelectedFan={setSelectedFan} fanList={fanList} />
    </div>
  )
}

export default ChatFanList