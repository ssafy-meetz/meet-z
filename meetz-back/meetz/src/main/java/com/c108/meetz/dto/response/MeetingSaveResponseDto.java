package com.c108.meetz.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingSaveResponseDto {
    private int meetingId;

    public MeetingSaveResponseDto(int meetingId) {
        this.meetingId = meetingId;
    }
}
