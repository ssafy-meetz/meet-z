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
        const res = await instance.post('api/manager/join', {
            email, password, company, phone
        })

        return res.status === 200;

    } catch (e: any) {
        throw new Error(`signup API 통신 오류 발생 : ${e}`)
    }
}

export default postUserSignup;