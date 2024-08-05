package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;

public record FanResponseDto(
        int userId,
        String name,
        String email,
        String phone
) {

    public static FanResponseDto from(User user) {
        return new FanResponseDto(user.getUserId(), user.getName(), user.getOriginEmail(), user.getPhone());
    }
}
