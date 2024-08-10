//package com.c108.meetz.dto.response;
//
//import com.c108.meetz.domain.Report;
//
//import java.util.List;
//
//// ReportDetailResponseDto.java
//
//public record ReportDetailResponseDto(
//        int reportId,
//        String reportedUserName,
//        String starName,
//        boolean isReported,
//        boolean isProfanity,
//        String filePath,
//        String transcript,
//        List<TranscriptionResponseDto.TranscriptionSegment> segments
//) {
//    // `Report`만으로 DTO를 생성하는 메서드 (for List view)
//    public static ReportDetailResponseDto fromEntity(Report report) {
//        return new ReportDetailResponseDto(
//                report.getReportId(),
//                report.getFan().getName(),
//                report.getStar().getName(),
//                report.isReported(),
//                report.isProfanity(),
//                report.getFilePath(),
//                null, // Transcript 정보는 리스트에서 필요 없음
//                null  // Segments 정보도 리스트에서 필요 없음
//        );
//    }
//
//    // `Report`와 `TranscriptionResponseDto`로 DTO를 생성하는 메서드 (for Detail view)
//    public static ReportDetailResponseDto fromEntity(Report report, TranscriptionResponseDto transcriptionResponse) {
//        return new ReportDetailResponseDto(
//                report.getReportId(),
//                report.getFan().getName(),
//                report.getStar().getName(),
//                report.isReported(),
//                report.isProfanity(),
//                report.getFilePath(),
//                transcriptionResponse.getTranscript(),
//                transcriptionResponse.getSegments()
//        );
//    }
//}
