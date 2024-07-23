package com.c108.meetz.exception;

import com.c108.meetz.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value= {BadRequestException.class})
    protected ApiResponse<Object> handleBadRequestException(BadRequestException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value= {DuplicateException.class})
    protected ApiResponse<Object> handleDuplicateException(DuplicateException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(value= {ForbiddenException.class})
    protected ApiResponse<Object> handleForbiddenException(ForbiddenException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value= {UnauthorizedException.class})
    protected ApiResponse<Object> handleUnauthorizedException(UnauthorizedException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value= {InternalServerErrorException.class})
    protected ApiResponse<Object> handleInterServerErrorException(InternalServerErrorException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value= {MethodArgumentNotValidException.class})
    protected ApiResponse<Object> handleMethodArgNotValidException(MethodArgumentNotValidException e){
        return ApiResponse.error(e.getErrorCode());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(value= {NotFoundException.class})
    protected ApiResponse<Object> handleNotFoundException(NotFoundException e){
        return ApiResponse.error(e.getErrorCode());
    }

}
