package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MethodArgumentNotValidException extends RuntimeException {
    private final ErrorCode errorCode;

}