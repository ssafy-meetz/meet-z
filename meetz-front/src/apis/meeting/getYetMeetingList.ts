import instance from "../axios"

const getYetMeetingList = async (accessToken: string) => {
  try {
    const { data } = await instance.get('/api/meeting/incompleted', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.status === 200 && data) {
      console.log(data)
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      throw new Error('만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.');
    }
    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
}

export default getYetMeetingList;