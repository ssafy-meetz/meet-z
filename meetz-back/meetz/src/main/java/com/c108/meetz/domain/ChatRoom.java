package com.c108.meetz.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @Column(name="chat_room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="meeting_id")
    @OnDelete(action=OnDeleteAction.CASCADE)
    private Meeting meeting;

    @Builder
    public ChatRoom (Meeting meeting) {
        this.meeting = meeting;
    }

}
