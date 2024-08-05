package com.c108.meetz.dto.response;

public record StarSseResponseDto(
        String meetingName,
        String userId,
        String nickName,
        int timer
){
    public StarSseResponseDto() {
        this("helloMeeting", "t123456@naver.com", "windowCow", 0);
    }
}
