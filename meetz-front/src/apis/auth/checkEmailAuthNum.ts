import instance from "../axios";

const checkEmailAuthNum = async (email: string, authCode: string) => {
    try {
        const res = await instance.get(`api/manager?email=${email}&authcode=${authCode}`);
        if (res.status === 200) {
            return true;
        } else if (res.status === 400) {
            throw new Error(`인증번호가 일치하지 않습니다.`);
        }
    } catch (e) {
        throw new Error(`인증 실패 : ${e}`);
    }
}

export default checkEmailAuthNum;