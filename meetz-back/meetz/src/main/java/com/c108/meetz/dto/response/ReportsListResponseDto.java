package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 특정 미팅에 대한 리포트 리스트 정보를 포함하는 DTO(Data Transfer Object).
 * 클라이언트에 전달할 미팅 정보와 리포트 요약 정보를 포함.
 */
@JsonSerialize
public class ReportsListResponseDto {

    public String meetingName;
    public String meetingStart;
    public String meetingEnd;
    public int meetingDuration;
    public int meetingTerm;
    public int totalParticipants;
    public int reportCount;
    public List<ReportsDetailResponseDto> reports;

    /**
     * ReportsListResponseDto 생성자.
     * 미팅 객체와 리포트 리스트, 총 참가자 수를 받아 필드 초기화.
     * @param meeting           미팅 객체
     * @param reports           리포트 객체 리스트
     * @param participantCount  총 참가자 수
     */
    public ReportsListResponseDto(Meeting meeting, List<Report> reports, int participantCount) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        this.meetingName = meeting.getMeetingName();
        this.meetingStart = meeting.getMeetingStart().format(formatter);  // LocalDateTime을 포맷하여 String으로 변환
        this.meetingEnd = meeting.getMeetingEnd().format(formatter);      // LocalDateTime을 포맷하여 String으로 변환
        this.meetingDuration = meeting.getMeetingDuration();
        this.meetingTerm = meeting.getTerm();
        this.totalParticipants = participantCount;
        this.reportCount = reports.size();
        this.reports = ReportsDetailResponseDto.getReports(reports);
    }

    /**
     * 리포트의 세부 정보를 포함하는 내부 클래스.
     * 각 리포트에 대한 자세한 정보를 담고 클라이언트에 전달.
     */
    static public class ReportsDetailResponseDto {
        public int reportId;
        public String reportedUserName;
        public String starName;
        public boolean isReported;
        public boolean isProfanity;
        public String filePath;

        /**
         * ReportsDetailResponseDto 생성자.
         * 리포트 객체를 받아 필드 초기화.
         * @param report  리포트 객체
         */
        public ReportsDetailResponseDto(Report report) {
            this.reportId = report.getReportId();
            this.reportedUserName = report.getFan().getName();
            this.starName = report.getStar().getName();
            this.isReported = report.isReported();
            this.isProfanity = report.isProfanity();
            this.filePath = report.getFilePath();
        }

        /**
         * 리포트 리스트를 받아, 각각을 ReportsDetailResponseDto 객체로 변환.
         * 리포트 리스트에서 세부 정보를 추출하여 ReportsDetailResponseDto 리스트로 반환.
         * @param reports  리포트 객체 리스트
         * @return         ReportsDetailResponseDto 객체 리스트
         */
        public static List<ReportsDetailResponseDto> getReports(List<Report> reports) {
            List<ReportsDetailResponseDto> getReportsResult = new ArrayList<>();
            for (Report report : reports) {
                getReportsResult.add(new ReportsDetailResponseDto(report));
            }
            return getReportsResult;
        }
    }
}
