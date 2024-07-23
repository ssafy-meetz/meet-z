package com.c108.meetz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LoginResponseDto {

    private String refreshToken;
    private String accessToken;
    private LocalDateTime expireAt;
    private String role;

}


