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

  const changeInputHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 200) {
      setInput(e.target.value)
    }
  }

  return (
    <div className='flex items-center p-3 border-t rounded-lg border max-w-sm'>
      <div className="flex border border-transparent rounded-lg focus-within:border-[#ff4f5d] focus-within:outline-none">
        <input
          type='text'
          value={input}
          onChange={(e) => changeInputHanlder(e)}
          onKeyDown={handleKeyPress}
          placeholder='질문을 입력하세요.'
          className='flex-grow p-3 pr-1 focus:outline-none w-48 rounded-xl'
        />
        <span className={`flex justify-center items-center w-8 text-sm cursor-default ${input.length === 200 ? 'text-red-500' : 'text-gray-400'}`}>{input.length}</span>
      </div>
      <button
        onClick={sendMessage}
        className='ml-3 text-[#ff4f5d] hover:text-[#fe6571] flex justify-center items-center'
      >
        <FaCircleArrowUp className='w-[35px] h-[35px]' />
      </button>
    </div>
  )
}

export default ChatInputBox
