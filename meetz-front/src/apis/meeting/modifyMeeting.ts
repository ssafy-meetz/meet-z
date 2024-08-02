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
  } catch (error) {

  }
}

export default putMeetingToModify;