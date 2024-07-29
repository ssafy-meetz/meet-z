package com.c108.meetz.dto.response;

import java.util.List;

public record CompletedMeetingListResponseDto(
        List<CompletedMeetingResponseDto> meetingList
) {}