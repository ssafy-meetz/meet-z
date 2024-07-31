import Form from '../../hooks/session/Form';
import Session from '../../hooks/session/Session';
import { Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/session/useOpenvidu';

function FanMeeting() {
  const { session, sessionId, publisher, subscriber, joinSession, sessionIdChangeHandler } = useOpenvidu();

  return (
	<div>
		<h1>진행화면</h1>
		<>
			{!session && (
				<Form
					joinSession={joinSession}
					sessionId={sessionId}
					sessionIdChangeHandler={sessionIdChangeHandler}
				/>
			)}
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
