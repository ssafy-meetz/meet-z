package com.c108.meetz.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //400 BAD_REQUEST
    FAIL(BAD_REQUEST, "실패"),
    DUPLICATE_EMAIL(BAD_REQUEST, "이미 가입된 이메일"),
    INVALID_VERIFICATION_CODE(BAD_REQUEST, "코드 인증 실패"),
    FAIL_TO_SEND_EMAIL(BAD_REQUEST, "메일 전송 실패");
    private final HttpStatus status;
    private final String message;
}
