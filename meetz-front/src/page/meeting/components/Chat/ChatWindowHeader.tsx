import { ChatFanDto } from "../../../../types/types"

interface ChatWindowProps {
  fan: ChatFanDto;
}

const ChatWindowHeader: React.FC<ChatWindowProps> = ({ fan }) => {
  return (
    <div className='h-20 flex flex-col justify-center items-center border-b-4 flex-shrink-0'>
      <h2 className='text-2xl font-bold'>{fan.name}</h2>
    </div>
  )
}

export default ChatWindowHeader