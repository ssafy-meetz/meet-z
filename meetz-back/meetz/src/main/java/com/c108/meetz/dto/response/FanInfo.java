package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;

public record FanInfo(
        int userId,
        String name,
        String email,
        String phone
) {

    public static FanInfo from(User user) {
        return new FanInfo(user.getUserId(), user.getName(), user.getOriginEmail(), user.getPhone());
    }
}
