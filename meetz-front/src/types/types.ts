/**
 * 로그인 API 통신 시 사용하는 타입
 */
export type LoginUserDto = {
    refreshToken: string;
    accessToken: string;
    expireAt: string;
    role: string;
}

/**
 * 회원가입 API 통신 시 사용하는 타입
 */
export type SignupResDto = {
    status: string;
    message: string;
}

export type MeetingDto = {
    meetingId: number;
    meetingName: string;
    meetingStart: string;
    meetingEnd: string;
    cnt: number;
}

export type MeetingDetailDto = {
    meetingId: number;
    meetingName: string;
    meetingStart: string;
    meetingEnd: string;
    meetingDuration: number;
    term: string;
    starList: StarDto[];
    fanList: DetailFanDto[];
    cnt: number;
}

export type StarDto = {
    name: string;
    email: string;
    password: string;
}

export type FanDto = {
    name: string;
    email: string;
    phone: string;
}

export type DetailFanDto = {
    userId: number | undefined;
    name: string;
    email: string;
    phone: string;
}