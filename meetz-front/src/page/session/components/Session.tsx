import React from 'react';
import { useState, useEffect } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import Video from './Video';


interface SessionProps {
	subscriber: Subscriber;
	publisher: Publisher;
}

function Session({ subscriber, publisher }: SessionProps) {

	const renderSubscribers = () => {

		return (
			<div className='flex'>
				<div>
					<Video streamManager={publisher} />
				</div>
				<div>
					<Video streamManager={subscriber} />
				</div>
			</div>
		);
	};

	return <>{renderSubscribers()}</>;
}

export default Session;
