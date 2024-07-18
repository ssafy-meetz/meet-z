package com.c108.meetz.constants;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {

    JOIN_SUCCESS(OK, "회원가입 성공");

    private final HttpStatus status;
    private final String message;
}
