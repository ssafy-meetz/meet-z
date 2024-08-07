import { Dispatch } from "react";
import { FaCircleArrowUp } from "react-icons/fa6"

interface ChatInputDto {
  input: string;
  setInput: Dispatch<string>;
  sendMessage: () => void;
}

const ChatInputBox: React.FC<ChatInputDto> = ({ input, setInput, sendMessage }) => {
  // Enter 키로 메시지 전송 처리
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='flex items-center p-4 border-t'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder='질문을 입력하세요.'
        className='flex-grow p-3 rounded-lg border focus:outline-none focus:border-red-500'
      />
      <button
        onClick={sendMessage}
        className='ml-3 text-[#ff4f5d] hover:text-[#fe6571]'
      >
        <FaCircleArrowUp className='w-[35px] h-[35px]' />
      </button>
    </div>
  )
}

export default ChatInputBox