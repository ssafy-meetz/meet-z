import { ChatDto } from "../../../../types/types"

const ManagerMessageBubble = ({ chat }: { chat: ChatDto }) => {
  return (
    <div className='flex justify-end'>
      <div className='bg-[#ff4f5d] text-white text-lg shadow-sm max-w-sm p-3 rounded-lg rounded-br-none'>
        <span>{chat.content}</span>
      </div>
    </div>
  )
}

export default ManagerMessageBubble