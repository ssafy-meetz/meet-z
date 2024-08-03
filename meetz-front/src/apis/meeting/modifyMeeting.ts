import { FanDto } from "../../types/types";
import instance from "../axios";

type starNameDto = {
  name: string;
}

interface CreateMeetingDTO {
  meetingName: string;
  meetingStart: string;
  meetingDuration: number;
  term: number;
  starList: starNameDto[];
  fanList: FanDto[];
}

const putMeetingToModify = async ({ meetingName, meetingStart, meetingDuration, term, starList, fanList }: CreateMeetingDTO, meetingId: number, accessToken: string) => {
  try {
    const { data } = await instance.put(`/api/meeting/${meetingId}`, {
      meetingName, meetingStart, meetingDuration, term, starList, fanList
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.code === 200) {
      return data;
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          throw new Error("접근 권한이 없습니다.");
        case 404:
          throw new Error("Meeting not found");
        case 400:
          throw new Error("접근 권한이 없습니다.");
        default:
          throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    } else {
      throw new Error("네트워크 오류 또는 서버가 응답하지 않습니다.");
    }
  }
}

export default putMeetingToModify;