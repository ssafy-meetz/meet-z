import instance from "../axios"

const postFanWarningAtOnce = async (userId: number, reason: string, accessToken: string) => {
  try {
    const { data, status } = await instance.post('/api/meeting/warning', {
      userId, reason
    }, {
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

export default postFanWarningAtOnce;