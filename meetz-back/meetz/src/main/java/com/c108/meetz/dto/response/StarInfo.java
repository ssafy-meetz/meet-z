package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;

public record StarInfo(
        String name,
        String email,
        String password
) {
    public static StarInfo from(User user) {
        return new StarInfo(user.getName(), user.getEmail(), user.getPassword());
    }
}