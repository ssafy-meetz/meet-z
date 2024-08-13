import instance from "../axios"

const getYetMeetingList = async (accessToken: string) => {
  try {
    const { data, status } = await instance.get('/api/meeting/incomplete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (status === 200 && data) {
      return data
    }

  } catch (error) {
    // if (error.response.status === 401) {
    //   throw new Error('로그인 관련 에러가 발생했습니다. 다시 로그인 해주세요.');
    // }
    // throw new Error('알 수 없는 에러가 발생했습니다.');
    return;
  }
}

export default getYetMeetingList;