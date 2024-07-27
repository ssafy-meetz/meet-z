package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.CommonDto;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.service.CommonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CommonApi {
    private final CommonService commonService;

    @PostMapping("/login")
    public ApiResponse<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto loginRequestDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException("올바른 형식이 아닙니다.");
        }
        LoginResponseDto response = commonService.login(loginRequestDto);
        return ApiResponse.success(OK, response);
    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResponseDto> tokenRefresh(@RequestHeader("Authorization") String header){
        LoginResponseDto response = commonService.refreshToken(header);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/info")
    public ApiResponse<CommonDto> checkInfo(){
        CommonDto response = commonService.checkInfo();
        return ApiResponse.success(OK, response);
    }

}
