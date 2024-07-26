package com.c108.meetz.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meetingId;

    @ManyToOne
    @JoinColumn(name = "managerId", nullable = false)
    private Manager manager;

    @NotNull
    @Column(nullable = false)
    private String meetingName;

    @NotNull
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime meetingStart;

    @NotNull
    @Column(nullable = false)
    private int meetingDuration;

    @NotNull
    @Column(nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime meetingEnd;

    @NotNull
    @Column(nullable = false)
    private int term;

}
