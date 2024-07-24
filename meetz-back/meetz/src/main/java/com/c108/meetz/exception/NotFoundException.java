package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class NotFoundException extends RuntimeException {
    private String message;
    public NotFoundException() {
        this.message = "Not found";
    }
    public NotFoundException(String message) {
        super(message);
        this.message = message;
    }
}