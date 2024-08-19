import { messageDto } from "../../../../types/types"

const FanMessageBubble = ({ chat }: { chat: messageDto }) => {
  return (
    <div className='flex justify-start'>
      <div className='bg-gray-100 p-3 max-w-sm text-lg rounded-lg shadow-sm rounded-bl-none break-words'>
        {chat.content}
      </div>
    </div>
  )
}

export default FanMessageBubble