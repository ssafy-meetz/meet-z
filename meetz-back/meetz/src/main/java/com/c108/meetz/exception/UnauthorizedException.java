package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
public class UnauthorizedException extends RuntimeException {
    private String message;
    public UnauthorizedException() {
        this.message = "Unauthorized";
    }
    public UnauthorizedException(String message) {
        super(message);
        this.message = message;
    }

}