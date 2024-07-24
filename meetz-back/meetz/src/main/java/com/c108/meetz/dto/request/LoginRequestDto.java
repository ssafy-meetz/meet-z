package com.c108.meetz.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {

    @Email
    @NotBlank(message = "이메일은 필수로 입력해야 합니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수로 입력해야 합니다.")
    private String password;

    private Boolean isManager;

}
