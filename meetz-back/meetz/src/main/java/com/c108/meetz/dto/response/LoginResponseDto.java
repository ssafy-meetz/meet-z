package com.c108.meetz.dto.response;

import java.time.LocalDateTime;

public record LoginResponseDto(
        String refreshToken,
        String accessToken,
        LocalDateTime expireAt,
        String role
) {}


