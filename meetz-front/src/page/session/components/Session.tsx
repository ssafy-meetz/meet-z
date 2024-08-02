import React from 'react';
import { useState, useEffect } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import Video from './Video';
import { useSessionStore } from '../../../zustand/useSessionStore';
import html2canvas from 'html2canvas';

interface SessionProps {
	subscriber: Subscriber;
	publisher: Publisher;
	takePhoto:boolean;
	completeCapture:()=>void;
}


function Session({ subscriber, publisher, takePhoto,completeCapture }: SessionProps) {
	const {myNickname,yourNickname} = useSessionStore();
	const [count,setCount] = useState(0);
	useEffect(()=>{
		if(!takePhoto)return;
		
	},[takePhoto]);

	//3초 타이머 설정
	useEffect(() =>{
		if(!takePhoto)return;
		setCount(3);
		console.log("시작!");
		const timerId = setInterval(() => {
			setCount(prevCount => {
			  if (prevCount <= 1) {
				clearInterval(timerId);
				capturePhoto();
				completeCapture();
				return 0;
			  }
			  return prevCount - 1;
			});
		  }, 1000);;

		return () => clearInterval(timerId);
	},[takePhoto,completeCapture])

	const capturePhoto = async () => {
		console.log("찰칵!");
		const element = document.getElementById('meetingVideo');
		if(element){
			const canvas = await html2canvas(element);
			canvas.toBlob(async (blob)=>{
				// if(blob){
				// 	const formData = new FormData();
				// 	formData.append('image',blob);
				// 	//이미지 데이터 전공 API 함수
				// }

				//임의로 사진이 잘 찍히는지 확인하는 코드
				if (blob) {
					// Create a URL for the blob and use it to create a download link
					const url = URL.createObjectURL(blob);
			
					// Create a link element
					const link = document.createElement('a');
					link.href = url;
					link.download = 'screenshot.jpg'; // Specify the file name
			
					// Append the link to the body (necessary for Firefox)
					document.body.appendChild(link);
			
					// Programmatically click the link to trigger the download
					link.click();
			
					// Clean up
					document.body.removeChild(link);
					URL.revokeObjectURL(url); // Release the blob URL
				  }
			},'image/jpeg')
		}
	  };
	const renderSubscribers = () => {
		return (
			<div className='flex'  id='meetingVideo'>
				<div className='relative w-1/2'>
					<Video streamManager={publisher} />
					{	!takePhoto&&
						<p className='absolute top-0 left-0 p-1 text-white bg-black bg-opacity-75 rounded'>
							{myNickname}
						</p>
					}
					
				</div>
				<div className='relative w-1/2'>
					<Video streamManager={subscriber} />
					{	subscriber&&!takePhoto&&
						<p className='absolute top-0 right-0 p-1 text-white bg-black bg-opacity-75 rounded'>
							{yourNickname}
						</p>
					}
				</div>
			</div>
		);
		
	};
	//3초 카운트 보여주는 html
	return(
		<>
			{renderSubscribers()}
			{count !== null && count > 0 && (
				<div className="fixed inset-0 flex justify-center items-center">
					<div className="text-6xl text-white font-bold">
						{count}
					</div>

				</div>
			)}

		</>
	)

	return <>{renderSubscribers()}</>;
}

export default Session;
