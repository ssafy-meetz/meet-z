import { useState, useRef } from 'react';
import postCheckProfanity from '../../apis/session/checkProfanity';

interface UseRecorderProps {
  audioChunks: Blob[]; // 녹음된 파일 객체(바인너리)
  isRecording: boolean; // 녹음 중 여부 boolean 변수
  startRecording: () => Promise<void>; //음성 녹음 시작
  stopRecording: () => void; // 음성 녹음 중단
  sendRecording: (email: string, accessToken: string) => Promise<void>;  // 음성 전송
}

const useRecorder = (): UseRecorderProps => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        setAudioChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendRecording = async (email: string, accessToken: string) => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'file.wav');

    try {
      await postCheckProfanity(email, accessToken, formData);
    } catch (error) {
      return;
    }
  };

  return {
    audioChunks,
    isRecording,
    startRecording,
    stopRecording,
    sendRecording,
  };
};

export default useRecorder;
