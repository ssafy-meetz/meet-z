package com.c108.meetz.exception;

import com.c108.meetz.constants.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
public class InternalServerErrorException extends RuntimeException {
    private String message;
    public InternalServerErrorException() {
        this.message = "Internal Server Error";
    }

    public InternalServerErrorException(String message) {
        super(message);
        this.message = message;
    }

}