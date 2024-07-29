package com.c108.meetz.dto.response;

import java.util.List;

public record FanListResponseDto(
        int meetingId,
        List<FanResponseDto> fanList
) { }
