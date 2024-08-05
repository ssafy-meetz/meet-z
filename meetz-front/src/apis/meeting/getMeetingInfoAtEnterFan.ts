import { StarMeetingDto } from "../../types/types";
import instance from "../axios"

type FanEnterDataDto = {
  meetingId: number | null;
  meetingName: string;
  meetingStart: string;
  meetingDuration: number;
  term: number;
  userPosition: number;
  chatRoomId: number;
  nickname: string;
  starList: StarMeetingDto[];
}

const getMeetingInfoAtEnterFan = async (accessToken: string): Promise<FanEnterDataDto | null> => {
  try {
    const { data } = await instance.get<{ code: number, data: FanEnterDataDto }>('/api/meeting/info', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    if (data.code) {
      return data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      const { code } = error.response;
      if (code === 400) {
        throw new Error('접근 권한이 없습니다.');
      }
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}

export default getMeetingInfoAtEnterFan;
