package com.c108.meetz.exception;

import lombok.Getter;


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