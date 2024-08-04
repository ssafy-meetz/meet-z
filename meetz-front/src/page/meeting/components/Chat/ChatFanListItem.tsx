import { FaCircle } from "react-icons/fa6";
import { ChatFanDto } from "../../../../types/types";

const ChatFanListItem = ({ setSelectedFan, fanList }: { setSelectedFan: React.Dispatch<ChatFanDto | null>; fanList: ChatFanDto[] }) => {

  // 팬 클릭 시 호출되는 핸들러
  const handleFanClick = (fan: ChatFanDto) => {
    setSelectedFan(fan);
  };

  // 메시지 길이를 자르는 함수
  const cutMessage = (message: string, maxLength: number) => {
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength) + '...';
  };

  return (
    <div
      className='overflow-y-auto h-full'
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
      }}
    >
      {fanList.map((fan) => (
        <button
          key={fan.id}
          onClick={() => handleFanClick(fan)}
          className='w-full h-18 flex flex-col p-4 gap-1 border-b hover:text-white focus:text-white focus:bg-[#ff4f5d] hover:bg-[#ff4f5d]'
        >
          <div className='flex h-full w-full justify-between items-center'>
            <span className='font-semibold text-lg'>{fan.name}</span>
            <span className='font-light text-xs'>{fan.time}</span>
          </div>
          <div className='flex h-full w-full items-center justify-between'>
            <span className='font-light text-sm text-gray-600'>
              {cutMessage(fan.Message, 25)}
            </span>
            <FaCircle className='text-[#ff4f5d] text-sm' />
          </div>
        </button>
      ))}
    </div>
  )
}

export default ChatFanListItem