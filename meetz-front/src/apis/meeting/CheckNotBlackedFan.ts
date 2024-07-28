import instance from "../axios"

const checkNotBlackedFan = async (name: string, email: string, phone: string, accessToken: string) => {
  try {
    const { data } = await instance.post('/api/meeting/blacklist', { name, email, phone }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data.status === 200) {
      return true;
    }

  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new Error("블랙리스트입니다.");
        default:
          throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    } else {
      throw new Error("네트워크 오류 또는 서버가 응답하지 않습니다.");
    }
  }
}