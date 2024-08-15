import StateHeader from '../components/Chat/StateHeader';
import ChatArea from '../components/Chat/ChatArea';

const ChatPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[#f9f9f9]'>
      <div className='max-w-screen-xl w-screen px-24 py-2'>
        {/* <StateHeader /> */}
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
