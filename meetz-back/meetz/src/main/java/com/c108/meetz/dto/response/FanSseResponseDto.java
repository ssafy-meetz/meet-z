package com.c108.meetz.dto.response;

public record FanSseResponseDto(
        String viduToken,
        int waitingNum,
        int remainStarNum,
        String currentStarName,
        String nextStarName,
        int timer
){
    public FanSseResponseDto(String viduToken) {
        this(viduToken, 0, 0, "Seungwon", "ChangWoo", 0);
    }
}
