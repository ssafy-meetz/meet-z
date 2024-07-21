package com.c108.meetz.constants;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {
    
    SUCCESS(OK, "성공 기본 코드"),
    JOIN_SUCCESS(HttpStatus.OK, "회원가입에 성공했습니다."),
    VERIFICATION_CODE_MATCH(OK, "인증에 성공했습니다."),
    VERIFICATION_CODE_SEND_SUCCESS(OK, "인증 요청을 완료했습니다."),
    LOGIN_SUCCESS(OK, "로그인에 성공했습니다.");
    
    private final HttpStatus status;
    private final String message;
}
