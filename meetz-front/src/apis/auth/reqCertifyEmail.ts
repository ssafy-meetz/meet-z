import instance from "../axios";

const reqCertifyEmail = async (eamil: string) => {
    try {
        await instance.get(`/api/manager/authemail?email=${eamil}`)
        return true;
    } catch (e) {
        return true;
    }
}

export default reqCertifyEmail;