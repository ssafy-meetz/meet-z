package com.c108.meetz.domain;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
public class UserMeetingId implements Serializable {
    private int userId;
    private int meetingId;

    public UserMeetingId(int userId, int meetingId){
        this.userId = userId;
        this.meetingId = meetingId;
    }
}
