import instance from "../axios"

const getMeetingInfoAtEnterStar = async (accessToken: string) => {
  try {
    const { data } = await instance.get(`/api/meeting/info/star`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.code) {
      return data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new Error("접근 권한이 없습니다.");
        case 404:
          throw new Error("참여중인 팬싸인회가 없습니다.");
        default:
          throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }
}

export default getMeetingInfoAtEnterStar;