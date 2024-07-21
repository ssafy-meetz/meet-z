package com.c108.meetz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDto {

    private String refreshToken;
    private String accessToken;
    private String expireAt;
    private String role;

}


