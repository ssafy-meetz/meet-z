interface ChatMessageProps {
  content: string;
  senderRole: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, senderRole }) => {
  return (
    <div
      className={`flex ${senderRole === 'FAN' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs p-3 my-1 rounded-lg  ${senderRole === 'FAN'
          ? 'bg-[#ff4f5d] text-white rounded-br-none'
          : 'bg-gray-100 text-gray-900 rounded-bl-none '
          }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
