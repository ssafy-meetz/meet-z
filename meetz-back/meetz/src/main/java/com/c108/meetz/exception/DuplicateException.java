package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class DuplicateException extends RuntimeException {

    private String message;
    public DuplicateException() {
        this.message = "Duplicate Exception";
    }
    public DuplicateException(String message) {
        super(message);
        this.message = message;
    }
}