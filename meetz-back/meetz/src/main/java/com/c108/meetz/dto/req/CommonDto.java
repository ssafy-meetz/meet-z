package com.c108.meetz.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonDto {

    private String email;
    private String password;
    private String role;
}
