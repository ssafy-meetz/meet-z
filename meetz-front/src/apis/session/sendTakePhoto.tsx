import fetchUserData from "../../lib/fetchUserData";
import instance from "../axios";

const sendTakePhoto = async () => {
  const { accessToken } = fetchUserData();
  try {
    const { data } = await instance.post("api/sessions/picture", {
      headers: `Bearer ${accessToken}`,
    });
    if (data === 200) {
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export default sendTakePhoto;
