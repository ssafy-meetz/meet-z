package com.c108.meetz.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BlackList {

    @Id
    @Column(name="blacklist_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int blacklistId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="manager_id")
    private Manager manager;

    private String name;

    private String email;

    private String phone;

    @Builder
    public BlackList(Manager manager, String name, String email, String phone){
        this.manager = manager;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }


}
