import instance from "../axios";

const checkEmailAuthNum = async (email: string, authCode: string) => {
    try {
        const { data } = await instance.get(`api/manager/checkauth?email=${email}&authcode=${authCode}`);
        if (data.code === 200) {
            return true;
        } else if (data.code === 400) {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export default checkEmailAuthNum;