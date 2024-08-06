import logo from '/src/assets/images/logo.png';
import { useRef, useEffect, useState } from 'react';
import { useSessionStore } from '../../../../zustand/useSessionStore'; // 상태 관리용 zustand 스토어 import

const StarLoadingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volume, setVolume] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false); // 웹캠 상태 변수 추가

  const setSettingDone = useSessionStore((state) => state.setSettingDone);

  // 사용자 카메라 및 마이크 권한 요청
  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // 비디오 태그에 stream 추가
        let video = videoRef.current;
        if (!video) {
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

  // 웹캠 및 오디오 연결 해제
  const disconnectCam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
      setAnalyser(null);
    }
  };

  // 컴포넌트 언마운트 시 카메라 연결 해제
  useEffect(() => {
    return () => {
      disconnectCam();
    };
  }, []);

  // 오디오 볼륨 업데이트
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

  // 버튼 클릭 시 웹캠 시작
  const handleStartCamera = () => {
    setIsCameraOn(true);
    getUserCamera();
  };

  const handleEnter = () => {
    setSettingDone(true); // Zustand 상태 업데이트
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[#f9f9f9]'>
      <div className='max-w-screen-xl w-screen px-24 '>
        <div className='flex justify-between items-end font-medium text-xl mb-2'>
          <img src={logo} alt='logo' className='w-[169px] h-[32px]' />
          <span className='text-[#ff7777] font-semibold text-shadow-shine cursor-default'>
            우주 최강 이승원 앨범 출시 팬 싸인회
          </span>
        </div>
        <div className='flex flex-col border-2 p-20 px-24 rounded-3xl h-[662px] border-[#d9d9d9] bg-white shadow-2xl '>
          <div className='flex w-full justify-between mb-3'>
            <span className='text-3xl font-semibold'>웹캠 연결</span>
            <span className='text-2xl'>
              <span className='text-3xl text-[#ff7777] font-semibold'>
                창우{' '}
              </span>
              님
            </span>
          </div>
          <span className='py-1 text-[#7d7d7d] text-lg'>
            아래 버튼을 클릭한 후 카메라/마이크 권한을 허용해 주세요
          </span>
          <span className='text-[#7d7d7d] text-lg '>
            차단된 경우 시스템 환경설정에서
            <br /> Google Chrome의 카메라, 마이크 접근을 허용해 주세요.
          </span>
          <div className='flex flex-col justify-center items-center w-full mt-4'>
            {!isCameraOn ? (
              <button
                onClick={handleStartCamera}
                className='mt-20 px-6 py-2 bg-[#ff7777] text-white rounded-full shadow-md hover:bg-[#ff4f5d] transition duration-200'
              >
                카메라 시작
              </button>
            ) : (
              <div className='flex items-center justify-between w-full'>
                {/* 비디오 및 오디오 바 컨테이너 */}
                <div className='pl-48 flex flex-col items-center'>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className='mt-2 rounded-lg'
                    style={{ width: '500px', aspectRatio: '3/2' }} // 크기 조정
                  ></video>
                  <div className='h-2 bg-gray-200 mt-2 w-[89%]'>
                    <div
                      className='h-full bg-[#ff4f5d] '
                      style={{ width: `${volume / 3}%` }} // 볼륨에 따라 바의 길이 조정
                    ></div>
                  </div>
                </div>
                {/* 입장 버튼 */}
                <button
                  onClick={handleEnter}
                  className='ml-4 px-6 py-2 bg-[#ff7777] text-white rounded-full shadow-md hover:bg-[#ff4f5d] transition duration-200'
                >
                  입장
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarLoadingPage;
