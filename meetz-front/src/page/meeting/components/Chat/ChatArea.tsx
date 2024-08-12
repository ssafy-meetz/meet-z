import ChatWindow from "./ChatWindow";
import ChatFanList from "./ChatFanList";

const ChatArea = () => {

  return (
    <div className='flex flex-col w-full mt-5 h-[660px] border rounded-3xl border-[#d9d9d9] bg-white shadow-2xl'>
      <div className='flex flex-row h-full'>
        {/* 채팅 목록 */}
        <ChatFanList />

        {/* 채팅창 */}
        <ChatWindow />
      </div>
    </div>
  )
}

export default ChatArea