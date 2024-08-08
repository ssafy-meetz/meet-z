import fetchUserData from "../../lib/fetchUserData";
import instance from "../axios";

const sendImageToServer = async (formData: FormData) => {
  const { accessToken } = fetchUserData();
  try {
    const { data } = await instance.post("api/meeting/image", {
      headers: accessToken,
      body: formData,
    });
    if (data.code === 200) {
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export default sendImageToServer;
