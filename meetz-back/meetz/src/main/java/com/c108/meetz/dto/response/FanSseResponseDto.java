package com.c108.meetz.dto.response;

public record FanSseResponseDto(
        String meetingName,
        String starName,
        String viduToken,
        int timer
){
    public FanSseResponseDto(String viduToken) {
        this("helloMeeting", "leeseungwon", viduToken, 0);
    }
}
