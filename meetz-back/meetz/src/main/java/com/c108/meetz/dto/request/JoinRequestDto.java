package com.c108.meetz.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class ManagerJoinRequest {

    @Email
    private String email;

    @NotBlank
    @Pattern(
            regexp = "^(?=.*[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]).{8,}$",
            message = "비밀번호는 8자 이상이고, 특수문자가 최소 1글자 포함되어야 합니다."
    )
    private String password;

    @NotBlank
    private String company;

    @NotBlank
    @Length(min=11, max=11)
    private String phone;
}
