package com.c108.meetz.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Manager {

    @Id
    @Column(name="manager_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int managerId;

    @NotNull
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(nullable = false)
    private String password;

    @NotNull
    @Column(nullable = false)
    private String company;

    @NotNull
    @Column(nullable = false)
    private String phone;

    @Column()
    private String token;

    @Builder
    public Manager(String email, String password, String company, String phone) {
        this.email = email;
        this.password = password;
        this.company = company;
        this.phone = phone;
    }
}
