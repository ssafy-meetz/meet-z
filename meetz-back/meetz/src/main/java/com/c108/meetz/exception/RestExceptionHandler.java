package com.c108.meetz.exception;

import com.c108.meetz.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {CustomException.class})
    protected ApiResponse<Object> handleCustomException(CustomException e, HttpServletRequest request) {
        return ApiResponse.error(e.getErrorCode());
    }
}
