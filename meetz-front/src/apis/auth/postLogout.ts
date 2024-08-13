import instance from "../axios"

const postLogout = async (refreshToken: string) => {
  try {
    const { status } = await instance.post(`api/leave?token=${refreshToken}`, {}, {
    })

    if (status === 200) {
      return true;
    }
  } catch (error: any) {
    return false;
  }
}

export default postLogout;