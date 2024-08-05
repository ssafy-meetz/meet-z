package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;

public record FanNameInfo(String nickname, String name) {
    public static FanNameInfo from(User user) {
        return new FanNameInfo(user.getNickname(), user.getName());
    }
}
