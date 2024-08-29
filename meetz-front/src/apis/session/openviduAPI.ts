import axios, { AxiosError } from 'axios';

const OPENVIDU_SERVER_URL = 'https://i11c108.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

// 세션 생성 함수
export const createSession = async (sessionIds: string): Promise<string> => {
  try {
    const data = JSON.stringify({ customSessionId: sessionIds });
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
      data,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const sessionId = (response.data as { id: string }).id;

    return sessionId;

  } catch (error) {
    const errorResponse = (error as AxiosError)?.response;

    if (errorResponse?.status === 409) {
      // 세션이 이미 존재하는 경우, 기존 세션 ID를 반환
      await startViduRecording(sessionIds);
      return sessionIds;
    }

    return '';
  }
};

// 녹화 시작 함수
export const startViduRecording = async (sessionId: string) => {
  console.log(">>>>>>>>>> startViduRecording 호출됨")
  try {
    const data = JSON.stringify({
      session: sessionId,
      name: `${sessionId}_recording`,
      outputMode: 'COMPOSED',
      recordingLayout: 'BEST_FIT',
      frameRate: 30,
      hasVideo: false,
    });

    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/api/recordings/start`,
      data,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('>>>>>>>>>> startViduRecording try문 실행돼서 요청 보내짐 > ', response.data);
    return response.data; // recordingId 포함된 정보를 반환
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

// 녹화 중단 함수
export const stopViduRecording = async (recordingId: string) => {
  console.log('>>>>>>>>>> stopViduRecording 호출됨');
  console.log(">>>>>>>>>> 호출된 recordingID(세션아이디)는 ", recordingId)
  try {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/api/recordings/stop/${recordingId}`,
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('>>>>>>>>>> stopViduRecording 호출되고 요청 보내짐', response.data);
    return response.data;
  } catch (error) {
    console.error('Error stopping recording:', error);
  }
};

// 녹화 음성 삭제 함수
export const deleteViduRecording = async (sessionId: string) => {
  try {
    await axios.delete(
      `${OPENVIDU_SERVER_URL}/openvidu/api/recordings/${sessionId}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('>>>>>>>>>> deleteViduRecording 호출됐고, 정상적으로 삭제됨');
  } catch (error) {
    console.error('Error stopping recording:', error);
  }
}

// 토큰 생성 함수
export const createToken = (sessionIds: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const data = {};
    axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
        data,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
            )}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        resolve((response.data as { token: string }).token);
      })
      .catch(error => reject(error));
  });
};

// 세션 존재 확인 함수
export const checkSessionExists = async (sessionId: string) => {
  try {
    const response = await axios.get(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const sessions = response.data.content || [];
    const exists = sessions.some((session: any) => session.sessionId === sessionId);
    return exists;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
};
