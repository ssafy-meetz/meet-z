package com.c108.meetz.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class CommonDto {

    private String email;
    private String password;
    private String role;

    public CommonDto(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
