import { useState, useCallback, useEffect } from 'react';
import { OpenVidu, Session as OVSession, Subscriber, Publisher } from 'openvidu-browser';
import { createSession, createToken } from '../../apis/session/openviduAPI';
import { useSessionStore } from '../../zustand/useSessionStore';


export const useOpenvidu = () => {
    const [session, setSession] = useState<OVSession | ''>('');
	const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
	const [publisher, setPublisher] = useState<Publisher | null>(null);
	const [OV, setOV] = useState<OpenVidu | null>(null);
	const {token} = useSessionStore();


  const leaveSession = useCallback(() => {
        if (session) session.disconnect();
        setOV(null);
        setSession('');
        setSubscriber(null);
        setPublisher(null);
    }, [session]);

    const joinSession = () => {
        const OVs = new OpenVidu();
        setOV(OVs);
        setSession(OVs.initSession());
    };

    useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);

        return () => {
            window.removeEventListener('beforeunload', leaveSession);
        };
    }, [leaveSession]);

    useEffect(() => {
        if (session === '') return;

        session.on('streamDestroyed', event => {
            if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
                setSubscriber(null);
            }
        });
    }, [subscriber, session]);

    useEffect(() => {
		if (session === '') return;

		session.on('streamCreated', event => {
			const subscribers = session.subscribe(event.stream, '');
			setSubscriber(subscribers);
		});

		session.connect(token)
		.then(() => {
			if (OV) {
				const publishers = OV.initPublisher(undefined, {
					audioSource: undefined,
					videoSource: undefined,
					publishAudio: true,
					publishVideo: true,
					mirror: true,

				});

				setPublisher(publishers);
				session
					.publish(publishers)
					.then(() => {})
					.catch(() => {});
			}
		})
		.catch(() => {});
	}, [session, OV, token]);
    return {
        session,
        publisher,
        subscriber,
        joinSession,
        leaveSession
      };

}
