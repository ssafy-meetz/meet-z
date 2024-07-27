package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.service.TemporaryGenerator;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.c108.meetz.domain.Role.FAN;

@Getter
@Setter
public class FanSaveDto {

    private String name;
    private String email;
    private String phone;

    public User toUser(Meeting meeting){
        User user = new User();
        user.setMeeting(meeting);
        user.setName(this.name);
        user.setEmail(this.email);
        user.setPhone(this.phone);
        user.setPassword(TemporaryGenerator.generateTemporaryPassword());
        user.setRole(FAN);
        return user;
    }
}
