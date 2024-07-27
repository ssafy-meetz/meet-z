import { LoginUserDto } from "../../types/types";
import instance from "../axios"

const getAccessTKByRefreshTK = async (refreshToken: string) => {
  try {
    const { data } = await instance.get('/api/refresh', {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });

    return data.data as LoginUserDto;

  } catch (error) {
    throw new Error('토큰 갱신 오류');
  }
}

export default getAccessTKByRefreshTK;