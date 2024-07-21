package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.service.CommonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.c108.meetz.constants.SuccessCode.LOGIN_SUCCESS;
import static com.c108.meetz.constants.SuccessCode.TOKEN_REISSUE_SUCCESS;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CommonApi {
    private final CommonService commonService;

    @PostMapping("/login")
    public ApiResponse<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto loginRequestDto){
        LoginResponseDto response = commonService.login(loginRequestDto);
        return ApiResponse.success(LOGIN_SUCCESS, response);
    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResponseDto> tokenRefresh(@RequestHeader("Authorization") String header){
        LoginResponseDto response = commonService.refreshToken(header);
        return ApiResponse.success(TOKEN_REISSUE_SUCCESS, response);
    }

}
