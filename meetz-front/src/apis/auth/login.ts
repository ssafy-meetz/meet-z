import instance from "../axios";
import { LoginUserDto } from "../../types";

/**
 * 백엔드 API 통신 - 로그인
 * @param {string} username - 스태프/아이돌/팬 이메일
 * @param {string} password - 가입한/발급받은 비밀번호
 * @return {Promise<LoginUserDto>} refreshToken, accessToken, expireAt, role을 담은 객체
 */
const postUserLogin = async (username: string, password: string): Promise<LoginUserDto> => {
  try {
    const { data } = await instance.post('/api/login', {
      username, password
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data as LoginUserDto;
  } catch (e) {
    throw new Error(`login API 통신 오류 발생 : ${e}`);
  }
}

export default postUserLogin;