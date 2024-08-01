package com.c108.meetz.domain;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="meeting_id")
    @OnDelete(action=OnDeleteAction.CASCADE)
    private Meeting meeting;

    @CreatedDate
    private LocalDateTime recentChat;

    @Builder
    public ChatRoom (User user, Meeting meeting) {
        this.user = user;
        this.meeting = meeting;
    }

    public void updateRecentChat(LocalDateTime recentChat) {
        this.recentChat = recentChat;
    }

}
