import instance from "../axios"

const getChatDetailForFan = async (accessToken: string) => {
  try {
    const { data } = await instance.get(`/api/chatroom/fan`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (data.code) {
      return data.data;
    }
  } catch (error) {
    throw new Error();
  }
}

export default getChatDetailForFan;