package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;

public record StarResponseDto(
        String name,
        String email,
        String password
) {
    public static StarResponseDto from(User user) {
        return new StarResponseDto(user.getName(), user.getEmail(), user.getPassword());
    }
}