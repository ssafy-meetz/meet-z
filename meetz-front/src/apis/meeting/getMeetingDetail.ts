import instance from "../axios"


const getMeetingDetail = async (id: number, accessToken: string) => {
  try {
    const { data, status } = await instance.get(`/api/meeting/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (status === 200 && data.code === 200) {
      return data.data;
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          throw new Error("접근 권한이 없습니다.");
        case 404:
          throw new Error("Meeting not found");
        default:
          throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    } else {
      throw new Error("네트워크 오류 또는 서버가 응답하지 않습니다.");
    }
  }
}