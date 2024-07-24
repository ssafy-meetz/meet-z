package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class BadRequestException extends RuntimeException {
    private String message;

    public BadRequestException() {
        this.message = "Bad Request";
    }

    public BadRequestException(String message) {
        super(message);
        this.message = message;
    }
}
