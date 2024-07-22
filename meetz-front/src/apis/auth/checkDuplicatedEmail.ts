import instance from "../axios";

const checkDuplicatedEmail = async (email: string) => {
    try {
        const res = await instance.get(`api/manager/checkemail?email=${email}`);
        return res.status === 200;
    } catch (e) {
        throw new Error(`이메일 중복 체크 중 에러 발생 : ${e}`)
    }
}

export default checkDuplicatedEmail;