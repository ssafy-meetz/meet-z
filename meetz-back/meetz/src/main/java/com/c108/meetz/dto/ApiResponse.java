package com.c108.meetz.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;

    private ApiResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    private ApiResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static <T> ApiResponse<T> success(HttpStatus status, T data) {
        return new ApiResponse<>(status.value(), "SUCCESS", data);
    }
    public static <T> ApiResponse<T> success(HttpStatus status) {
        return new ApiResponse<>(status.value(), "SUCCESS");
    }

    public static <T> ApiResponse<T> error(HttpStatus status) {
        return new ApiResponse<>(status.value(), status.name());
    }

    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(status.value(), message);
    }
}
