import instance from "../axios";

const reqCertifyEmail = async (eamil: string) => {
    try {
        const res = await instance.post(`api/manager/authemail?email=${eamil}`)
        return res.status === 200;
    } catch (e) {
        throw new Error(`이메일 인증 요청 실패 : ${e}`)
    }
}

export default reqCertifyEmail;