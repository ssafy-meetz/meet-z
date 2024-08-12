package com.c108.meetz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TranscriptionResponseDto {
    private String filePath; // 파일 경로를 추가
    private String transcript;
    private boolean hasProfanityInTranscript;
    private List<TranscriptionSegment> segments;


    public TranscriptionResponseDto(String filePath, String transcript, boolean hasProfanityInTranscript, List<TranscriptionSegment> segments) {
        this.filePath = filePath;
        this.transcript = transcript;
        this.hasProfanityInTranscript = hasProfanityInTranscript;
        this.segments = segments;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TranscriptionSegment {
        private String startTime;
        private String endTime;
        private String text;
        private List<String> badWordsList;
    }

}
