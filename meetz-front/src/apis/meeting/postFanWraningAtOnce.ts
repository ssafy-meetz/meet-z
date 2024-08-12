import { isAxiosError } from "axios"
import instance from "../axios"

const postFanWarningAtOnce = async (userId: number, reason: string, accessToken: string) => {
  try {
    await instance.post('/api/meeting/warning', {
      userId, reason
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error('이미 경고 처리된 유저입니다.');
        case 403:
          throw new Error('이미 블랙리스트에 등록된 유저입니다.');
        case 404:
          throw new Error('사용자를 찾을 수 없습니다.');
        default:
          throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}

export default postFanWarningAtOnce;