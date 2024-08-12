package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.fasterxml.jackson.annotation.JsonFormat;

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
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingEnd,
        String meetingDuration,
        String meetingTerm,
        int totalParticipants,
        int reportCount,
        List<ReportDetailResponseDto> reports
) {
    public static ReportListResponseDto fromEntities(Meeting meeting, List<Report> reports, int participantCount) {
        return new ReportListResponseDto(
                meeting.getMeetingName(),
                meeting.getMeetingStart(),
                meeting.getMeetingEnd(),
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