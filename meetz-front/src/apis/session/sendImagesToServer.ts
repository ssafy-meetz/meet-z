import fetchUserData from "../../lib/fetchUserData";
import instance from "../axios";

const sendImageToServer = async (formData: FormData,selectedFrame:number) => {
  const { accessToken } = fetchUserData();
  try {
    const { data } = await instance.post(`/api/meeting/image/${selectedFrame}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (data.code === 200) {
      console.log("이미지 발송 완료 !");
      localStorage.removeItem("images");
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export default sendImageToServer;
