package com.c108.meetz.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TranscriptionResponseDto {
    private String transcript;
    private List<ProfanityCheckResult> profanityResults;

    public TranscriptionResponseDto(String transcript, List<ProfanityCheckResult> profanityResults) {
        this.transcript = transcript;
        this.profanityResults = profanityResults;
    }

    @Getter
    @Setter
    public static class ProfanityCheckResult {
        private int wordIndex;
        private String word;

        public ProfanityCheckResult(int wordIndex, String word) {
            this.wordIndex = wordIndex;
            this.word = word;
        }
    }
}
