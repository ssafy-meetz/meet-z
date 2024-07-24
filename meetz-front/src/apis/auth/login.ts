import instance from "../axios";
import { LoginUserDto } from "../../types";

/**
 * 백엔드 API 통신 - 로그인
 * @param {string} email - 스태프/아이돌/팬 이메일
 * @param {string} password - 가입한/발급받은 비밀번호
 * @return {Promise<LoginUserDto>} refreshToken, accessToken, expireAt, role을 담은 객체
 */
const postUserLogin = async (email: string, password: string, isManager: boolean): Promise<LoginUserDto> => {
  try {
    const { data } = await instance.post('/api/login', {
      email, password, isManager
    });

    if (data && data.code == 200) {
      alert('로그인에 성공했습니다.')
      return data as LoginUserDto;
    } else if (data.code === 404) {
      throw new Error('존재하지 않는 회원입니다.')
    } else {
      throw new Error('로그인 오류가 발생했습니다.')
    }

  } catch (e) {
    throw new Error(`로그인 오류가 발생했습니다.`);
  }
}

export default postUserLogin;