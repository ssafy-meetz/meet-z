package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Manager;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public record JoinRequestDto(
        @Email String email,
        @NotBlank @Pattern(
                regexp = "^(?=.*[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]).{8,}$",
                message = "비밀번호는 8자 이상이고, 특수문자가 최소 1글자 포함되어야 합니다."
        ) String password,
        @NotBlank String company,
        @NotBlank @Length(min = 10, max = 11) String phone
        ) {
    public Manager toManager(BCryptPasswordEncoder bCryptPasswordEncoder) {
        return Manager.builder()
                .email(this.email)
                .password(bCryptPasswordEncoder.encode(this.password))
                .company(this.company)
                .phone(this.phone)
                .build();
    }
}