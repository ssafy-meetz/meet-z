package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingInfoStarResponseDto(int meetingId, String meetingName, @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart, int meetingDuration, int term, String name, List<FanNameInfo> fanList) {
    public static MeetingInfoStarResponseDto of(Meeting meeting, List<FanNameInfo> fanList, String name) {
        return new MeetingInfoStarResponseDto(
                meeting.getMeetingId(),
                meeting.getMeetingName(),
                meeting.getMeetingStart(),
                meeting.getMeetingDuration(),
                meeting.getTerm(),
                name,
                fanList
        );
    }
}
