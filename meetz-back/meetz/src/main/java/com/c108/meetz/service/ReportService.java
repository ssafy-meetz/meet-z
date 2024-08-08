package com.c108.meetz.service;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.c108.meetz.domain.ReportReason;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.ReportResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.ReportRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

    public ReportResponseDto saveReport(int meetingId, int userId) {
        log.info("saveReport called with meetingId: {} and userId: {}", meetingId, userId);

        if (!SecurityUtil.getCurrentUserRole().equals("STAR")) {
            log.error("접근 권한이 없습니다.");
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        Optional<Report> existingReport = reportRepository.findByMeeting_MeetingIdAndUser_UserId(meetingId, userId);
        if (existingReport.isPresent()) {
            log.error("이미 신고하였습니다.");
            throw new BadRequestException("이미 신고하였습니다.");
        }

        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> {
                    log.error("Meeting not found with id: {}", meetingId);
                    return new IllegalArgumentException("Meeting not found");
                });
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", userId);
                    return new IllegalArgumentException("User not found");
                });

        Report report = new Report();
        report.setMeeting(meeting);
        report.setUser(user);
        report.setReason(ReportReason.스타신고);
        report.setFilePath(null); // filePath를 null로 설정

        Report savedReport = reportRepository.save(report);
        log.info("Report saved with id: {}", savedReport.getReportId());

        return new ReportResponseDto(
                savedReport.getReportId(),
                savedReport.getMeeting().getMeetingId(),
                savedReport.getUser().getUserId(),
                savedReport.getReason(),
                savedReport.getFilePath()
        );
    }
}
