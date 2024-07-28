package com.c108.meetz.dto.response;

public record FanResponseDto(
        int userId,
        String name,
        String email,
        String phone
) {}

