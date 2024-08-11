package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public record ReportListResponseDto(
        String meetingName,
        String meetingStart,    // String 타입으로 수정
        String meetingEnd,      // String 타입으로 수정
        String meetingDuration,
        String meetingTerm,
        int totalParticipants,
        int reportCount,
        List<ReportDetailResponseDto> reports
) {
    public static ReportListResponseDto fromEntities(Meeting meeting, List<Report> reports, int participantCount) {
        return new ReportListResponseDto(
                meeting.getMeetingName(),
                meeting.getMeetingStart().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),  // 여기도 포맷팅
                meeting.getMeetingEnd().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),    // 여기도 포맷팅
                String.valueOf(meeting.getMeetingDuration()),
                String.valueOf(meeting.getTerm()),
                participantCount,
                reports.size(),
                reports.stream()
                        .map(ReportDetailResponseDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}