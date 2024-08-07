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
