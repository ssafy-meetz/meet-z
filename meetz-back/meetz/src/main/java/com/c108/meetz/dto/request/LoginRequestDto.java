package com.c108.meetz.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @Email @NotBlank(message = "이메일은 필수로 입력해야 합니다.") String email,
        @NotBlank(message = "비밀번호는 필수로 입력해야 합니다.") String password,
        Boolean isManager
) {}
