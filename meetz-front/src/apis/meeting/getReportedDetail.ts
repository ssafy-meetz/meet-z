import instance from "../axios"

const getReportedDetail = async (meetingId: number, reportId: number, accessToken: string) => {

  try {
    const { data, status } = await instance.get(`/api/meeting/${meetingId}/report/${reportId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (status === 200 && data.code) {

      return data;
    }
  } catch (error: any) {
    if (error.status === 400) {
      throw new Error('신고 받은 내용을 로드하는데 실패했습니다.');
    }
  }
}

export default getReportedDetail;