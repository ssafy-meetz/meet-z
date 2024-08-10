import instance from "../axios"

const getReportedList = async (meetingId: number, accessToken: string) => {
  try {
    const { data, status } = await instance.get(`/api/meeting/${meetingId}/report`);

    if (status === 200 && data.code === 200) {
      return data.data;
    }
  } catch (error: any) {
    if (error.status === 400) {
      throw new Error('신고받은 팬 목록 조회 중 오류가 발생했습니다!');
    }
  }
}

export default getReportedList;