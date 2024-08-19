import { FaCircleArrowUp } from "react-icons/fa6";
import { useManagerChatStore } from "../../../../zustand/useManagerChatStore";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ChatInputBoxProps {
  sendMessage: () => void;
}

const ChatInputBox = ({ sendMessage }: ChatInputBoxProps) => {
  const { inputMessage, setInputMessage } = useManagerChatStore();

  // Enter 키로 메시지 전송 처리
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return; // 메시지가 공백일 경우 전송하지 않음
    sendMessage(); // input창에 입력한 메시지를 보내기
  };

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 200) {
      setInputMessage(e.target.value)
    }
  }

  return (
    <div className='mb-6 mx-5 flex items-center border rounded-lg focus-within:border-[#ff4f5d] flex-shrink-0'>
      <input
        type='text'
        placeholder='메시지를 입력하세요.'
        value={inputMessage} // 상태와 연동된 입력값
        onChange={(e) => changeMessage(e)} // 입력값 업데이트
        onKeyDown={handleKeyPress}
        className='flex-grow p-3 focus:outline-none rounded-lg'
      />
      <span className=''>
        {inputMessage.length < 200 ?
          <span className="text-gray-300">{inputMessage.length}/200</span> : (
            <span className="text-red-500">{inputMessage.length}/200</span>
          )}
      </span>
      <button disabled={inputMessage.length > 200} onClick={handleSendMessage} className={`p-2 ${inputMessage.length <= 200 ? 'text-[#ff4f5d]' : 'text-slate-300'}`}>
        <FaCircleArrowUp className='w-8 h-8' />
      </button>
    </div>
  )
}

export default ChatInputBox