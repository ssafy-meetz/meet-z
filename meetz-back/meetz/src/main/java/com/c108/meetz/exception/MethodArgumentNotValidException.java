package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
public class MethodArgumentNotValidException extends RuntimeException {
    private String message;
    public MethodArgumentNotValidException() {
        this.message = "Arguments not valid";
    }
    public MethodArgumentNotValidException(String message) {
        super(message);
        this.message = message;
    }

}