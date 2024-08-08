import instance from '../axios'


const deleteMeeting = async (accessToken: string, meetingId: number) => {
  try {
    const { data, status } = await instance.delete(`/api/meeting/${meetingId}`,{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    if (status === 200) {
      return data;
    } else {
      throw new Error('삭제에 실패했습니다.');
    }
  } catch (error: any){
    if (error.response){
      if (error.response.status === 404) {
        throw new Error("존재하지 않는 일정입니다.");       
      } else if (error.response.status === 400) {
        throw new Error("접근 권한이 없습니다.")
      } else if (error.response.status === 401) {
        throw new Error("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.")
      }
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
}
  

export default deleteMeeting