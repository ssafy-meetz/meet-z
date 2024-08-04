import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { ChatFanDto } from "../../../../types/types";
import ChatFanList from "./ChatFanList";
import fanList from "./fanList";

const ChatArea = () => {
  const [selectedFan, setSelectedFan] = useState<ChatFanDto | null>(null);

  return (
    <div className='flex flex-col w-full mt-5 h-[660px] border rounded-3xl border-[#d9d9d9] bg-white shadow-2xl'>
      <div className='flex flex-row h-full'>
        {/* 채팅 목록 */}
        <ChatFanList setSelectedFan={setSelectedFan} fanList={fanList} />

        {/* 채팅창 */}
        <ChatWindow fan={selectedFan} />
      </div>
    </div>
  )
}

export default ChatArea