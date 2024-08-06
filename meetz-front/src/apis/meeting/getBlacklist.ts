import instance from "../axios";

// 블랙리스트 아이템 타입 정의
interface BlacklistItem {
  blacklistId: number;
  name: string;
  email: string;
  phone: string;
}

// 블랙리스트 데이터를 가져오는 함수
const getBlacklist = async (accessToken: string): Promise<BlacklistItem[]> => {
  try {
    // GET 요청 보내기
    const { data, status } = await instance.get('/api/blacklist', {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    // 응답 상태 코드 및 데이터 확인
    if (status === 200 && data) {
      return data.data.blackList; // 실제 데이터 반환
    }

    // 성공하지 못한 경우의 기본 처리
    throw new Error("블랙리스트 조회에 실패했습니다.");

  } catch (error: any) {
    // 401 에러 처리
    if (error.response && error.response.status === 401) {
      throw new Error('만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.');
    }

    // 기타 에러 처리
    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
}

export default getBlacklist;
