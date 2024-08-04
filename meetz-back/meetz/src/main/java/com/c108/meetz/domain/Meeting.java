package com.c108.meetz.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Meeting {

    @Id
    @Column(name="meeting_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meetingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Manager manager;

    @NotNull
    @Column(nullable = false, name="meeting_name")
    private String meetingName;

    @NotNull
    @Column(nullable = false, name="meeting_start")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime meetingStart;

    @NotNull
    @Column(nullable = false, name="meeting_duration")
    private int meetingDuration;

    @Column(nullable = false, name="meeting_end")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime meetingEnd;

    @NotNull
    @Column(nullable = false)
    private int term;

    @Builder
    public Meeting(Manager manager, String meetingName, LocalDateTime meetingStart, int meetingDuration, LocalDateTime meetingEnd, int term){
        this.manager = manager;
        this.meetingName = meetingName;
        this.meetingStart = meetingStart;
        this.meetingDuration = meetingDuration;
        this.meetingEnd = meetingEnd;
        this.term = term;
    }

}
