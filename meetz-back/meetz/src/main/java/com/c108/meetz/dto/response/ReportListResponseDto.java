package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;

import java.util.List;
import java.util.stream.Collectors;

public record ReportListResponseDto(
        String meetingName,
        String meetingStart,
        String meetingEnd,
        String meetingDuration,
        String meetingTerm,
        int totalParticipants,
        int reportCount,
        List<ReportDetailResponseDto> reports
) {
    public static ReportListResponseDto fromEntities(Meeting meeting, List<Report> reports, int participantCount) {
        List<ReportDetailResponseDto> reportDtos = reports.stream()
                .map(ReportDetailResponseDto::fromEntity) // List view에서는 fromEntity(report) 사용
                .collect(Collectors.toList());

        return new ReportListResponseDto(
                meeting.getMeetingName(),
                meeting.getMeetingStart().toString(),
                meeting.getMeetingEnd().toString(),
                String.valueOf(meeting.getMeetingDuration()),
                String.valueOf(meeting.getTerm()),
                participantCount,
                reports.size(),
                reportDtos
        );
    }
}
