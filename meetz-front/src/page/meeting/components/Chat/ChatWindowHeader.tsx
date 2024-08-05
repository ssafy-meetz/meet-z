import { useManagerChatStore } from "../../../../zustand/useManagerChatStore"

const ChatWindowHeader: React.FC = () => {
  const { selectedFan } = useManagerChatStore();
  return (
    <div className='h-20 flex flex-col justify-center items-center border-b-4 flex-shrink-0'>
      <h2 className='text-2xl font-bold'>{selectedFan?.name}</h2>
    </div>
  )
}

export default ChatWindowHeader