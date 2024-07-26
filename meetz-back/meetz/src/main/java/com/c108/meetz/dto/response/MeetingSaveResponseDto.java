package com.c108.meetz.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingResponseDto {
    private int meetingId;

    public MeetingResponseDto(int meetingId) {
        this.meetingId = meetingId;
    }
}
