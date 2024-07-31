
import Session from './components/Session';
import { Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/session/useOpenvidu';
import { useEffect } from 'react';

function FanMeeting() {
  const { session, sessionId, publisher, subscriber, joinSession} = useOpenvidu();
  useEffect(() => {
	joinSession();
  }, []);
  return (
	<div>
		<h1></h1>
		<>
			{session && (
				<Session
					publisher={publisher as Publisher}
					subscriber={subscriber as Subscriber}
				/>
			)}
		</>
	</div>
);
}

export default FanMeeting;
