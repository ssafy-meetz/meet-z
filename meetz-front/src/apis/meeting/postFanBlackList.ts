import { isAxiosError } from "axios";
import instance from "../axios"

const postFanBlackList = async (userId: number, accessToken: string) => {
  try {
    const { data, status } = await instance.post(`/api/blacklist/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (status === 200 && data.code) {
      return true;
    }
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error('이미 블랙리스트에 등록된 유저입니다..');
        case 403:
          throw new Error('접근 권한이 없습니다.');
        case 404:
          throw new Error('존재하지 않는 회원입니다.');
        default:
          throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}

export default postFanBlackList