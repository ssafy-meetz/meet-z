interface ChatMessageProps {
  message: string;
  sender: 'user' | 'agent';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs p-3 my-1 rounded-lg  ${
          sender === 'user'
            ? 'bg-[#ff4f5d] text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none '
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
