package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.service.TemporaryGenerator;

import static com.c108.meetz.domain.Role.FAN;


public record FanSaveDto(String name, String email, String phone) {

    public User toUser(Meeting meeting){
        User user = new User();
        user.setMeeting(meeting);
        user.setName(this.name);
        user.setNickname(this.name);
        user.setOriginEmail(this.email);
        user.setEmail(TemporaryGenerator.generateTemporaryEmail());
        user.setPhone(this.phone);
        user.setPassword(TemporaryGenerator.generateTemporaryPassword());
        user.setRole(FAN);
        return user;
    }
}
