import instance from "../axios"

const getChatList = async (meetingId: number, accessToekn: string) => {
  try {
    const { data } = await instance.get(`/api/chatroom/${meetingId}`, {
      headers: {
        'Authorization': `Bearer ${accessToekn}`
      }
    })

    if (data.code === 200) {
      return data.data;
    }
  } catch (error) {
    throw new Error('채팅방 불러오기에 실패했습니다.');
  }
}

export default getChatList;