package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class ForbiddenException extends RuntimeException {
    private String message;
    public ForbiddenException() {
        this.message = "Forbidden";
    }
    public ForbiddenException(String message) {
        super(message);
        this.message = message;
    }
}