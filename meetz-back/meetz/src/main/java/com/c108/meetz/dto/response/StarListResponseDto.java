package com.c108.meetz.dto.response;

import java.util.List;

public record StarListResponseDto(
        int meetingId,
        List<StarResponseDto> starList
) { }
