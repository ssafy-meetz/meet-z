import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';

interface Props {
	streamManager: StreamManager;
}

function Video({ streamManager }: Props) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const autoplay = true;

	useEffect(() => {
		if (streamManager && videoRef.current) {
			streamManager.addVideoElement(videoRef.current);
		}
	}, [streamManager]);

	return (
		<video autoPlay={autoplay} ref={videoRef} className="w-full max-h-[318px]">
			<track kind="captions" />
		</video>
	);
}

export default Video;
