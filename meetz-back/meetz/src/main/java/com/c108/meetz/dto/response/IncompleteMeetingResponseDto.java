package com.c108.meetz.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record IncompleteMeetingResponseDto(
        int meetingId,
        String meetingName,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart,
        int cnt
) { }