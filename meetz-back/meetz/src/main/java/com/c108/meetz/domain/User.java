package com.c108.meetz.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="meeting_id")
    private Meeting meeting;

    private String email;

    private String password;

    private String name;

    private String nickname;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String token;

}
