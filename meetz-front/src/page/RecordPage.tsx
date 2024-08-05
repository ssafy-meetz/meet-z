import React, { useState, useRef } from 'react';
import postCheckProfanity from '../apis/session/checkProfanity';
import fetchUserData from '../lib/fetchUserData';

const RecordPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { accessToken } = fetchUserData();

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        setAudioChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendRecording = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      await postCheckProfanity(accessToken || "", formData);
      // console.log(data);
    } catch (error) {
      console.error('Error sending audio file:', error);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={handleSendRecording} disabled={audioChunks.length === 0}>
        Send Recording
      </button>
    </div>
  );
};

export default RecordPage;
