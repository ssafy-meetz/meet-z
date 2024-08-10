package com.c108.meetz.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private int reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Meeting meeting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "star_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User fan;

    @Column(name = "isReported", nullable = false)
    private boolean isReported;

    @Column(name = "isProfanity", nullable = false)
    private boolean isProfanity;

    @Column(name = "file_path", nullable = true)
    private String filePath;

    public Report(Meeting meeting, User star, User fan, boolean isReported, boolean isProfanity, String filePath) {
        this.meeting = meeting;
        this.star = star;
        this.fan = fan;
        this.isReported = isReported;
        this.isProfanity = isProfanity;
        this.filePath = filePath;
    }
}