package com.c108.meetz.exception;

import lombok.Getter;

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