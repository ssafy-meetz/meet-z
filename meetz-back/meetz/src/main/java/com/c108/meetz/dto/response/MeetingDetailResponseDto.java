package com.c108.meetz.dto.response;

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
) { }