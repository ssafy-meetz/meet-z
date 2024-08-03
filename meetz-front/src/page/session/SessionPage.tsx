import Session from './components/Session';
import { Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/session/useOpenvidu';
import { useEffect, useState } from 'react';
import logo_white from '/src/assets/images/logo-white.png'

import { useSessionStore } from '../../zustand/useSessionStore';

function FanMeeting() {
  const { session, publisher, subscriber, joinSession} = useOpenvidu();
  const [sessionId,setSessionId] = useState("");
  const [second,setSecond] = useState(0);
  useEffect(() => {
	//localStorage에 가져올 값들
	setSessionId("meetz")
	setSecond(90);
	const secondId = setInterval(() => {
		setSecond(prevSecond => {
		  if (prevSecond <= 1) {
			clearInterval(secondId);
			return 0;
		  }
		  return prevSecond - 1;
		});
	  }, 1000);;

	return () => clearInterval(secondId);
  }, []);
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
				<p className='text-2xl text-[#FE9374] font-semibold'>{(second/60).toFixed()}:{second%60}</p>
			</div>

			<div className='flex w-[846px]' style={{transform:'none'}}>
				{session && (
					<Session
						publisher={publisher as Publisher}
						subscriber={subscriber as Subscriber}
					/>
				)}
			</div>
			
			
		</div>
	</div>
);
}

export default FanMeeting;
