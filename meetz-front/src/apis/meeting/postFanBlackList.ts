import instance from "../axios"

const postFanBlackList = async (userId: number, accessToken: string) => {
  try {
    const { data, status } = await instance.post(`/api/blacklist/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (status === 200 && data.code) {
      return true;
    }
  } catch (error: any) {
    throw error;
  }
}

export default postFanBlackList