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
    public static class TranscriptionSegment {
        private String startTime;
        private String endTime;
        private String text;
        private boolean hasProfanity;
        private List<String> badWordsList;

        // 새로운 생성자 추가
        public TranscriptionSegment(String startTime, String endTime, String text, boolean hasProfanity, List<String> badWordsList) {
            this.startTime = startTime;
            this.endTime = endTime;
            this.text = text;
            this.hasProfanity = hasProfanity;
            this.badWordsList = badWordsList;
        }
    }
}
