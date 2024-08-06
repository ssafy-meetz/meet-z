
import { Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { useOpenvidu } from '../../../../hooks/session/useOpenvidu';
import { useEffect, useState } from 'react';
import logo_white from '/src/assets/images/logo-white.png'
import { useSessionStore } from '../../../../zustand/useSessionStore';
import StarSession from '../components/StarSession';

function StarSessionPage() {
	const { session, publisher, subscriber, joinSession} = useOpenvidu();
	const [time,setTime] = useState(0);
	const [formatTime,setFormatTime] = useState("");
	const {timer, token, remain, setToken} = useSessionStore();
	useEffect(() => {
	  setTime(timer);
	  setToken("wss://i11c108.p.ssafy.io:8443?sessionId=2dc8586c69&token=tok_JQ9SrJ9NxOMQDGjK");
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
	  joinSession();
	},[token])
	

  return (
	<div>
		<div className='flex flex-col justify-center items-center h-screen bg-black'>
			<div>
				<img className='w-56 mb-[48px]' src={logo_white} />
			</div>
			<div className='flex w-[846px] justify-between'>
				<p className='text-xl text-white font-bold'>{remain}</p>
				<p className='text-2xl text-[#FE9374] font-semibold'>{formatTime}</p>
			</div>

			<div className='flex w-[846px]' style={{transform:'none'}}>
				{session && (
					<StarSession
						publisher={publisher as Publisher}
						subscriber={subscriber as Subscriber}
					/>
				)}
			</div>
			
			
		</div>
	</div>
);
}

export default StarSessionPage;
