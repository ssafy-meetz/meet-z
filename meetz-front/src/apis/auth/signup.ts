import instance from "../axios";

/**
 * 백엔드 API 통신 - 회원가입
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} company
 * @param {string} phone
 * @return {boolean}
 */

const postUserSignup = async (email: string, password: string, company: string, phone: string): Promise<boolean> => {
    try {
        const { data } = await instance.post('/api/manager/join', {
            email, password, company, phone
        })

        if (data.code === 400) {
            return false;
        } else {
            return true;
        }

    } catch (e: any) {
        return false;
    }
}

export default postUserSignup;