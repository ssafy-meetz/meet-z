package com.c108.meetz.dto.response;

public record SseResponseDto (
        String meetingName,
        String starName,
        String viduToken,
        int timer
){
    public SseResponseDto(String viduToken) {
        this("helloMeeting", "leeseungwon", viduToken, 0);
    }
}
