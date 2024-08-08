import instance from "../axios"

const putModifyFanNickname = async (nickname: string, accessToken: string) => {
  try {
    const { data, status } = await instance.put(`/api/meeting/nickname?nickname=${nickname}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (status === 200 && data.code === 200) {
      return true;
    }

  } catch (error) {
    return false;
  }
}

export default putModifyFanNickname;