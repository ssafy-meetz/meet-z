import instance from '../axios';

const getFanSession = async (accesstoken: string) => {
  try{
    const response = await instance.get("/api/sessions/sse",{
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
    const data = response.data

    if (data.type === 2) {
      return data.timer;
    } else {
      return null;
    }
  } catch (error:any) {
    console.error(error);
  }
};

export default getFanSession;