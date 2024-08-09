package com.c108.meetz.dto.response;

public record StarSseResponseDto(
        boolean isBreak,
        int remainFanNum,
        String currentFanName,
        int currentFanId,
        int timer
){
    public StarSseResponseDto() {
        this(false, 1, "mingyung", 15, 0);
    }

    public static StarSseResponseDto endMeeting() {
        return new StarSseResponseDto(false, -1, null, 0, 0);
    }
    public static StarSseResponseDto breakMeeting() {
        return new StarSseResponseDto(true, 0, null, 0, 0);
    }

}
