package com.c108.meetz.dto.response;

public record SseResponseDto (
        String meetingName,
        String starName,
        String sessionId,
        int timer
){
    public SseResponseDto(String sessionId) {
        this("helloMeeting", "leeseungwon", sessionId, 0);
    }
}
