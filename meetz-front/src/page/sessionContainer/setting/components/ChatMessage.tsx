interface ChatMessageProps {
  content: string;
  senderRole: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, senderRole }) => {
  return (
    <div
      className={`flex max-w-xs ${senderRole === 'FAN' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[240px] p-3 my-1 rounded-lg break-words  ${senderRole === 'FAN'
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
