package com.c108.meetz.exception;

import lombok.Getter;

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