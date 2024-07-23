import instance from "../axios";

const checkDuplicatedEmail = async (email: string) => {
    try {
        const { data } = await instance.get(`api/manager/checkemail?email=${email}`);

        if (data.status === 400) { //중복이다.
            return false;
        } else { // 중복이 아니다.
            return true;
        }
    } catch (e) {
        console.error('이메일 중복 체크 중 에러 발생!');
    }
}

export default checkDuplicatedEmail;