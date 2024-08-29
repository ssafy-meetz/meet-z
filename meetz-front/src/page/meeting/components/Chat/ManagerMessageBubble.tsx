import { messageDto } from "../../../../types/types"

const ManagerMessageBubble = ({ chat }: { chat: messageDto }) => {
  return (
    <div className='flex justify-end'>
      <div className='bg-[#ff4f5d] text-white text-lg shadow-sm max-w-md p-3 rounded-lg rounded-br-none break-words'>
        {chat.content}
      </div>
    </div>
  )
}

export default ManagerMessageBubble