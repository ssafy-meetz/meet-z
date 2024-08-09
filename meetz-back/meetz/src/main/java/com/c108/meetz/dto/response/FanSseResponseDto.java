package com.c108.meetz.dto.response;

public record FanSseResponseDto(
        boolean isBreak,
        String viduToken,
        int waitingNum,
        int remainStarNum,
        String currentStarName,
        String nextStarName,
        int timer
){
    public FanSseResponseDto(String viduToken) {
        this(false, viduToken, 0, 0, "Seungwon", "ChangWoo", 0);
    }

    public static FanSseResponseDto endMeeting() {
        return new FanSseResponseDto(false, null, 0, -1, null, null, 0);
    }

    public static FanSseResponseDto breakMeeting() {
        return new FanSseResponseDto(true, null, 0, 0, null, null, 0);
    }

}
