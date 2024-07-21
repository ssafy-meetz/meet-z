/**
 * 로그인 API 통신 시 사용하는 타입
 * @types {refreshToken}
 * @types {accessToken}
 * @types {expireAt}
 * @types {role}
 */
export type LoginUserDto = {
    refreshToken: string;
    accessToken: string;
    expireAt: string;
    role: string;
}
