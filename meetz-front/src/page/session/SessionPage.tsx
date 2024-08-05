import Session from './components/Session';
import { Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/session/useOpenvidu';
import { useEffect, useState } from 'react';
import logo_white from '/src/assets/images/logo-white.png'

import { useSessionStore } from '../../zustand/useSessionStore';

function FanMeeting() {
  const { session, publisher, subscriber, joinSession} = useOpenvidu();
  const {starName, setStartName} = useSessionStore();
  const [sessionId,setSessionId] = useState("");
  const [time,setTime] = useState(0);
  const [formatTime,setFormatTime] = useState("");
  useEffect(() => {
	//백엔드 SSE 이벤트 수신 후 해당 값 설정(local Storage에도 저장?)
	setSessionId("meetz")
	//백엔드 통신 후 설정 Local storage에도 저장
	setTime(90);
	setStartName("이승원");
	//
	const secondId = setInterval(() => {
		setTime(prevTime => {
		  if (prevTime <= 1) {
			clearInterval(secondId);
			return 0;
		  }
		  return prevTime - 1;
		});
	  }, 1000);;

	return () => clearInterval(secondId);
  }, []);
  useEffect(()=>{
	const formatTime = (totalTime:number)=>{
		const minutes = Math.floor(totalTime/60);
		const seconds = Math.floor(totalTime%60);
		return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
	}
	setFormatTime(formatTime(time));
  },[time])
  useEffect(()=>{
	if(sessionId==='')return;
	joinSession(sessionId);
  },[sessionId])
  


  return (
	<div>
		<div className='flex flex-col justify-center items-center h-screen bg-black'>
			<div>
				<img className='w-56 mb-[48px]' src={logo_white} />
			</div>
			<div className='flex w-[846px] justify-between'>
				<p className='text-xl text-white font-bold'>MEETZMEETZ 팬싸인회</p>
				<p className='text-2xl text-[#FE9374] font-semibold'>{formatTime}</p>
			</div>

			<div className='flex w-[846px]' style={{transform:'none'}}>
				{session && (
					<Session
						publisher={publisher as Publisher}
						subscriber={subscriber as Subscriber}
						starName={starName}
					/>
				)}
			</div>
			
			
		</div>
	</div>
);
}

export default FanMeeting;
