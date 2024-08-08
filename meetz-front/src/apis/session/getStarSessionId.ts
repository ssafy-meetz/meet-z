import instance from "../axios";
const getStarSessionId = async (accessToken: string) => {
  try {
    const { data, status } = await instance.get("/api/sessions/vidu/star", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === 200) {
      return data.data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export default getStarSessionId;
