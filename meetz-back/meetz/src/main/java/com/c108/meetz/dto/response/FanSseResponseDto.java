package com.c108.meetz.dto.response;

public record FanSseResponseDto( //type 0: 대기, 1: 넘기기, 2: 쉬는시간, 3: 사진 찍기, 4: 미팅 끝
        int type,
        String viduToken,
        int waitingNum,
        int remainStarNum,
        String currentStarName,
        String nextStarName,
        int timer
){
    public FanSseResponseDto(String viduToken) {
        this(1, viduToken, 0, 0, "Seungwon", "ChangWoo", 0);
    }

    public static FanSseResponseDto snedNextInfo(String viduToken, int waitingNum, int remainStarNum, String currentStarName, String nextStarName, int timer) {
        return new FanSseResponseDto(1, viduToken, waitingNum, remainStarNum, currentStarName, nextStarName, timer);
    }

    public static FanSseResponseDto sendWaitInfo(int waitingNum, int remainStarNum, String nextStarName, int timer) {
        return new FanSseResponseDto(0, null, waitingNum, remainStarNum, null, nextStarName, timer);
    }

    public static FanSseResponseDto endMeeting() {
        return new FanSseResponseDto(4, null, 0, -1, null, null, 0);
    }

    public static FanSseResponseDto breakMeeting(int term) {
        return new FanSseResponseDto(2, null, 0, 0, null, null, term);
    }

    public static FanSseResponseDto takePicture() {
        return new FanSseResponseDto(3, null, 0, 0, null, null, 0);
    }

}
