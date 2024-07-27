package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.service.TemporaryGenerator;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.c108.meetz.domain.Role.STAR;

@Getter
@Setter
public class StarSaveDto {
    private String name;

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
