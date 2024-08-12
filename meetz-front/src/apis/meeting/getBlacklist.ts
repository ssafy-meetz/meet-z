import instance from "../axios";


const getBlacklist = async (accessToken: string) => {
  try {
    const { data, status } = await instance.get('/api/blacklist', {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (status === 200 && data) {
      return data
    }

    throw new Error("블랙리스트 조회에 실패했습니다.");

  } catch (error: any) {

    if (error.response && error.response.status === 401) {
      throw new Error('만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.');
    }


    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
}

export default getBlacklist;
