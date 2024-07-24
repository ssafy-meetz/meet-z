import { AxiosError } from "axios";
import instance from "../axios";

interface CheckAuthNumResponse {
    code: number;
    message: string;
}

const checkEmailAuthNum = async (email: string, authCode: string) => {
    try {
        const res = await instance.get(`api/manager/checkauth?email=${email}&authcode=${authCode}`);
        if (res.status === 200 && res.data.code === 200) {
            return true;
        }
    } catch (error) {
        const e = error as AxiosError<CheckAuthNumResponse>;
        if (e.response && e.response.status === 400) {
            throw new Error('인증번호가 일치하지 않습니다.');
        }
        throw new Error('인증 오류가 발생했습니다.');
    }

}

export default checkEmailAuthNum;