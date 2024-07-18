package com.c108.meetz.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //400 BAD_REQUEST
    DUPLICATE_EMAIL(BAD_REQUEST, "이미 가입된 이메일입니다");

    private final HttpStatus status;
    private final String message;
}
