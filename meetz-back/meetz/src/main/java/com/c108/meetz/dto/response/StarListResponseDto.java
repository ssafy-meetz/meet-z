package com.c108.meetz.dto.request;

public record StarListResponseDto(
        int meetingId,
        List<StarResponseDto> starList
) { }
