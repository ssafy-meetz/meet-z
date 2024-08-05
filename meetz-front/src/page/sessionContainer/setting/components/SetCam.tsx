import { useRef, useEffect, useState } from 'react';
import useEnvSettingStore from '../../../../zustand/useEnvSettingStore';

const SetCam = () => {
  const { nextStep, beforeStep, currentStep } = useEnvSettingStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volume, setVolume] = useState(0);

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
      .then((stream) => {
        // 비디오 tag에 stream 추가
        let video = videoRef.current;
        if (!video || currentStep !== 2) {
          return;
        }

        video.srcObject = stream;
        video.play();

        // 오디오 컨텍스트 설정
        const audioCtx = new AudioContext();
        const audioSource = audioCtx.createMediaStreamSource(stream);
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;
        audioSource.connect(analyserNode);
        setAudioContext(audioCtx);
        setAnalyser(analyserNode);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });
  };

  const disconnectCam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
      setAnalyser(null);
    }
  };

  const beforeBtn = () => {
    disconnectCam();
    beforeStep();
  }

  const nextBtn = () => {
    disconnectCam();
    nextStep();
  }

  useEffect(() => {
    if (currentStep === 2) {
      getUserCamera();
    } else {
      disconnectCam();
    }
    return () => {
      disconnectCam();
    };
  }, [currentStep]);

  useEffect(() => {
    if (analyser) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setVolume(average);
        requestAnimationFrame(updateVolume);
      };

      updateVolume();
    }
  }, [analyser]);

  return (
    <div className='flex flex-col w-[790px] items-center justify-center'>
      <div className='w-full flex flex-col px-24 h-full justify-center items-center gap-1'>
        <span className='text-3xl font-semibold'>웹캠 연결</span>
        <span className='text-[#7d7d7d] text-lg'>
          아래 버튼을 클릭한 후 카메라, 마이크 권한을 허용해 주세요.
        </span>
        {currentStep === 2 ? (
          <div className='flex flex-col justify-center items-center w-[400px]'>
            <video ref={videoRef} autoPlay className='h-72 mt-2 w-full'></video>
            <div className='h-2 bg-gray-200 mt-2 w-[384px]'>
              <div className='w-full h-full bg-[#ff4f5d]' style={{ width: `${volume / 3}%` }}></div>
            </div>
          </div>
        ) : (
          <button
            onClick={getUserCamera}
            className='h-72 mt-5 bg-white border hover:border-[#ff4f5d] focus:border-[#FF4F5D] focus:outline-none border-gray-200'
          >
            <span className='bg-[#323232] text-white rounded-2xl py-1 px-4'>
              웹캠 연결하기
            </span>
          </button>
        )}
        <span className='text-[#7d7d7d] text-lg mt-2'>
          차단된 경우 시스템 환경설정에서
          <br /> Google Chrome의 카메라, 마이크 접근을 허용해 주세요.
        </span>
      </div>
      <div className='w-full flex justify-between h-28 px-14'>
        <button
          onClick={beforeBtn}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white'
        >
          이전
        </button>
        <button
          onClick={nextBtn}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SetCam;
