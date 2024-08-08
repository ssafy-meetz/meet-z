package com.c108.meetz.domain;

import jakarta.persistence.*;
import lombok.Builder;
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
    @Column(name = "report_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Meeting meeting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportReason reason;

    @Column(name = "file_path", nullable = true)
    private String filePath;

    @Builder
    public Report(Meeting meeting, User user, ReportReason reason, String filePath) {
        this.meeting = meeting;
        this.user = user;
        this.reason = reason;
        this.filePath = filePath;
    }
}
