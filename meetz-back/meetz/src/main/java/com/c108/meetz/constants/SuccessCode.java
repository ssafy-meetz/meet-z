package com.c108.meetz.constants;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {
    
    SUCCESS(OK, "성공"),
    JOIN_SUCCESS(OK, "회원가입 성공"),
    VERIFICATION_CODE_MATCH(OK, "이메일 인증 코드 일치");
    
    
    private final HttpStatus status;
    private final String message;
}
