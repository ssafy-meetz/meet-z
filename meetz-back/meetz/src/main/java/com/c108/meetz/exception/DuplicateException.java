package com.c108.meetz.exception;

import lombok.Getter;

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