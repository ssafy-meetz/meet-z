import instance from "../axios";

const reqCertifyEmail = async (eamil: string) => {
    try {
        const { data } = await instance.get(`api/manager/authemail?email=${eamil}`)

        if (data.code === 400) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        throw new Error(`이메일 인증 요청 실패 : ${e}`)
    }
}

export default reqCertifyEmail;