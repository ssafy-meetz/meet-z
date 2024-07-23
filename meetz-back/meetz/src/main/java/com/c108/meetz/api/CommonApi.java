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

import static com.c108.meetz.constants.ErrorCode.FAIL_TO_LOGIN;
import static com.c108.meetz.constants.SuccessCode.LOGIN_SUCCESS;
import static com.c108.meetz.constants.SuccessCode.TOKEN_REISSUE_SUCCESS;
import static com.c108.meetz.constants.SuccessCode.CHECK_INFO_SUCCESS;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CommonApi {
    private final CommonService commonService;

    @PostMapping("/login")
    public ApiResponse<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto loginRequestDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(FAIL_TO_LOGIN);
        }
        LoginResponseDto response = commonService.login(loginRequestDto);
        return ApiResponse.success(LOGIN_SUCCESS, response);
    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResponseDto> tokenRefresh(@RequestHeader("Authorization") String header){
        LoginResponseDto response = commonService.refreshToken(header);
        return ApiResponse.success(TOKEN_REISSUE_SUCCESS, response);
    }

    @GetMapping("/info")
    public ApiResponse<CommonDto> checkInfo(){
        CommonDto response = commonService.checkInfo();
        return ApiResponse.success(CHECK_INFO_SUCCESS, response);
    }

}
