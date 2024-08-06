import { ChatDto } from "../../../../types/types"

const FanMessageBubble = ({ chat }: { chat: ChatDto }) => {
  return (
    <div className='flex justify-start'>
      <div className='bg-gray-100 p-3 max-w-sm text-lg rounded-lg shadow-sm rounded-bl-none'>
        <span>{chat.content}</span>
      </div>
    </div>
  )
}

export default FanMessageBubble