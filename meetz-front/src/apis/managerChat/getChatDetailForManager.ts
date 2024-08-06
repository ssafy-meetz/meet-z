import instance from "../axios"

const getChatDetailForManager = async (meetingId: number, userId: number, accessToken: string) => {
  try {
    const { data } = await instance.get(`/api/chatroom/${meetingId}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.code === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error('채팅 내역 불러오기에 실패했습니다.');
  }
}

export default getChatDetailForManager;