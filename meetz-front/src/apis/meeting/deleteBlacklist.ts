import instance from '../axios'

const deleteBlacklist = async (accessToken: string, blacklistId: number) => {
  try {
    const { data, status } = await instance.delete(`/api/blacklist/${blacklistId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (status === 200) {
      return data;
    } else {
      throw new Error('삭제에 실패했습니다.');
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("존재하지 않는 블랙리스트입니다.");
      } else if (error.response.status === 400) {
        throw new Error("접근 권한이 없습니다.");
      }
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
}

export default deleteBlacklist;
