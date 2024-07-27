package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.service.TemporaryGenerator;
import static com.c108.meetz.domain.Role.STAR;

public record StarSaveDto(String name) {

    public User toUser(Meeting meeting){
        User user = new User();
        user.setMeeting(meeting);
        user.setName(name);
        user.setEmail(TemporaryGenerator.generateTemporaryEmail());
        user.setPassword(TemporaryGenerator.generateTemporaryPassword());
        user.setRole(STAR);
        return user;
    }

}
