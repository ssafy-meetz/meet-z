import fetchUserData from "../../lib/fetchUserData";

import instance from "../axios";
const getFanReport = async (fanId: string) => {
  const { accessToken } = fetchUserData();
  try {
    const { data, status } = await instance.post(
      `api/meeting/report/${fanId}`,
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
    if (status === 200) {
      console.log("신고 완료!");
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export default getFanReport;
