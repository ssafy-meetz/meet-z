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
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Chat {

    @Id
    @Column(name="chat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chat_room_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChatRoom chatRoom;

    @Column(name="sender_role")
    private String senderRole; //팬이 보냈는지 매니저가 보냈는지

    @Column(name="sender_id")
    private int senderId;

    @Column(name="receiver_id")
    private int receiverId;

    private String content;

    @CreatedDate
    @Column(name= "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Chat(ChatRoom chatRoom, String senderRole, int senderId, int receiverId, String content) {
        this.chatRoom = chatRoom;
        this.senderRole = senderRole;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
    }

}
