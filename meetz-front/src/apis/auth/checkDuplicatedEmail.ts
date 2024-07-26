import { AxiosError } from "axios";
import instance from "../axios";

interface SignupResponse {
    code: number;
    message: string;
}

const checkDuplicatedEmail = async (email: string) => {
    try {
        await instance.get(`/api/manager/checkemail?email=${email}`);
        return true;
    } catch (error) {
        const e = error as AxiosError<SignupResponse>;
        if (e.response && e.response.status === 400) {
            throw new Error('이미 가입된 이메일입니다.');
        }
        throw new Error('이메일 중복 체크 중 오류가 발생했습니다.');
    }
}

export default checkDuplicatedEmail;