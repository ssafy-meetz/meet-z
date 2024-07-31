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
public class ChatRoom {

    @EmbeddedId
    private UserMeetingId userMeetingId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @MapsId("userId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="meeting_id")
    @MapsId("meetingId")
    @OnDelete(action=OnDeleteAction.CASCADE)
    private Meeting meeting;

    @Builder
    public ChatRoom (User user, Meeting meeting) {
        this.user = user;
        this.meeting = meeting;
    }

}
