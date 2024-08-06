package com.c108.meetz.dto.response;

public record StarSseResponseDto(
        int remainFanNum,
        String currentFanName,
        int currentFanId,
        int timer
){
    public StarSseResponseDto() {
        this(1, "mingyung", 15, 0);
    }
}
