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

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Warning {

    @Id
    @Column(name = "warning_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int warningId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Meeting meeting;

    @NotNull
    @Column(nullable = false, name = "name")
    private String name;

    @NotNull
    @Column(nullable = false, name = "phone")
    private String phone;

    @Column(name = "reason")
    private String reason;

    @Builder
    public Warning(Meeting meeting, String email, String name, String phone, String reason) {
        this.meeting = meeting;
        this.name = name;
        this.phone = phone;
        this.reason = reason;
    }
}
