package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Manager;
import jakarta.validation.constraints.*;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
public class JoinRequestDto {

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
    @Length(min=10, max=11)
    private String phone;

    public Manager toManager(BCryptPasswordEncoder bCryptPasswordEncoder){
        Manager manager = new Manager();
        manager.setEmail(this.email);
        manager.setPassword(bCryptPasswordEncoder.encode(this.password));
        manager.setCompany(this.company);
        manager.setPhone(this.phone);
        return manager;
    }
}
