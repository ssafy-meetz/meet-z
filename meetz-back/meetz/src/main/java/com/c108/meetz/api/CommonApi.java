package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.req.LoginRequestDto;
import com.c108.meetz.dto.res.LoginResponseDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonApi {

//    @PostMapping("api/login")
//    public ApiResponse<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto){
//        return ApiResponse<LoginResponseDto>
//    }
}
