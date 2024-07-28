package com.c108.meetz.dto.response;

public record StarResponseDto(
        int meetingRoomId,
        String name,
        String email,
        String password
) {}