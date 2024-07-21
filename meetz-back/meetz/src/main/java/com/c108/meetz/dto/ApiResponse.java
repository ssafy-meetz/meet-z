package com.c108.meetz.dto;

import com.c108.meetz.constants.ErrorCode;
import com.c108.meetz.constants.SuccessCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;

    private ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    private ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static <T> ApiResponse<T> success(SuccessCode code, T data) {
        return new ApiResponse<>(code.getStatus().value(), code.getMessage(), data);
    }
    public static <T> ApiResponse<T> success(SuccessCode code) {
        return new ApiResponse<>(code.getStatus().value(), code.getMessage());
    }

    public static <T> ApiResponse<T> error(ErrorCode code) {
        return new ApiResponse<>(code.getStatus().value(), code.getMessage());
    }
}
