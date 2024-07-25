package com.c108.meetz.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meeting_id;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;

    @NotNull
    @Column(nullable = false)
    private String meeting_name;

    @NotNull
    @Column(nullable = false)
    private Timestamp meeting_start;

    @NotNull
    @Column(nullable = false)
    private int meeting_duration;

    @NotNull
    @Column(nullable = false)
    private Timestamp meeting_end;

    @NotNull
    @Column(nullable = false)
    private int term;

}
