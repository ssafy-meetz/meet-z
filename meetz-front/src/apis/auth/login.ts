import { LoginUserDto } from "../../types/types";
import instance from "../axios";
import { AxiosError } from "axios";

interface LoginResponse {
  code: number;
  data: LoginUserDto
}

/**
 * 백엔드 API 통신 - 로그인
 * @param {string} email - 스태프/아이돌/팬 이메일
 * @param {string} password - 가입한/발급받은 비밀번호
 * @param {boolean} isManager - 매니저 여부
 * @return {Promise<LoginUserDto>} refreshToken, accessToken, expireAt, role을 담은 객체
 */
const postUserLogin = async (email: string, password: string, isManager: boolean): Promise<LoginUserDto> => {
  try {
    const { data } = await instance.post<LoginResponse>('/api/login', {
      email, password, isManager
    });
    return data.data as LoginUserDto;

  } catch (error) {
    const e = error as AxiosError<LoginResponse>;
    if (e.response) {
      if (e.response.status === 404) {
        throw new Error('존재하지 않는 회원입니다.');
      } else if (e.response.status === 400) {
        throw new Error('올바른 형식이 아닙니다.');
      }
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
}

export default postUserLogin;
