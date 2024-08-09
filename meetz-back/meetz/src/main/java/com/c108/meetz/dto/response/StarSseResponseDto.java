package com.c108.meetz.dto.response;

public record StarSseResponseDto( //type 1: 넘기기, 2: 쉬는시간, 3: 사진 찍기, 4: 미팅 끝
        int type,
        int remainFanNum,
        String currentFanName,
        int currentFanId,
        int timer
){
    public StarSseResponseDto() {
        this(1, 1, "mingyung", 15, 0);
    }

    public static StarSseResponseDto sendNext(int remainFanNum, String currentFanName, int currentFanId, int timer) {
        return new StarSseResponseDto(1, remainFanNum, currentFanName, currentFanId, timer);
    }

    public static StarSseResponseDto endMeeting() {
        return new StarSseResponseDto(4, -1, null, 0, 0);
    }

    public static StarSseResponseDto breakMeeting() {
        return new StarSseResponseDto(2, 0, null, 0, 0);
    }

    public static StarSseResponseDto takePicture() {
        return new StarSseResponseDto(3, 0, null, 0, 0);
    }

}
