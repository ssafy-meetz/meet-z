package com.c108.meetz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscriptionResponseDto {
    private String transcript;
    private boolean hasProfanityInTranscript;
    private List<TranscriptionSegment> segments;
    private String filePath; // 파일 경로를 추가

    // 파일 경로를 포함하지 않는 생성자 추가
    public TranscriptionResponseDto(String transcript, boolean hasProfanityInTranscript, List<TranscriptionSegment> segments) {
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
