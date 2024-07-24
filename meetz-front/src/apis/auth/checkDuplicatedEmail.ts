import instance from "../axios";

const checkDuplicatedEmail = async (email: string) => {
    try {
        const { data } = await instance.get(`api/manager/checkemail?email=${email}`);
        if (data.code === 200) { //중복이 아니다.
            return true;
        } else { // 중복이다.
            return false;
        }
    } catch (e) {
        throw new Error('이메일 중복 체크 중 에러 발생!');
    }
}

export default checkDuplicatedEmail;