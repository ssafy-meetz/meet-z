package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingDetailResponseDto(
        int meetingId,
        String meetingName,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingEnd,
        int meetingDuration,
        int term,
        List<StarResponseDto> starList,
        List<FanResponseDto> fanList
) {
    public static MeetingDetailResponseDto of(Meeting meeting, List<StarResponseDto> starList, List<FanResponseDto> fanList) {
        return new MeetingDetailResponseDto(
                meeting.getMeetingId(),
                meeting.getMeetingName(),
                meeting.getMeetingStart(),
                meeting.getMeetingEnd(),
                meeting.getMeetingDuration(),
                meeting.getTerm(),
                starList,
                fanList
        );
    }

}