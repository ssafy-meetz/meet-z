package com.c108.meetz.service;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.c108.meetz.domain.ReportReason;
import com.c108.meetz.domain.User;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.DuplicateException;
import com.c108.meetz.exception.NotFoundException;
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

    /**
     * 사용자 신고를 저장
     *
     * @param meetingId 신고할 미팅 ID
     * @param userId 신고할 사용자 ID
     * @throws BadRequestException 사용자가 STAR 역할이 아닐 때 발생
     * @throws DuplicateException 동일한 미팅과 사용자에 대한 신고가 이미 존재할 때 발생
     * @throws NotFoundException 미팅 또는 사용자를 찾을 수 없을 때 발생
     */
    public void saveReport(int meetingId, int userId) {
        log.info("saveReport called with meetingId: {} and userId: {}", meetingId, userId);

        // 현재 사용자 권한이 STAR가 아닌 경우 예외 발생
        if (!SecurityUtil.getCurrentUserRole().equals("STAR")) {
            log.error("접근 권한이 없습니다.");
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        // 동일한 미팅과 사용자에 대한 신고가 이미 존재하는지 확인
        Optional<Report> existingReport = reportRepository.findByMeeting_MeetingIdAndUser_UserId(meetingId, userId);
        if (existingReport.isPresent()) {
            log.error("이미 신고하였습니다.");
            throw new DuplicateException("이미 신고하였습니다.");
        }

        // 미팅 ID로 미팅 조회, 없으면 예외 발생
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> {
                    log.error("Meeting not found with id: {}", meetingId);
                    return new NotFoundException("Meeting not found");
                });

        // 사용자 ID로 사용자 조회, 없으면 예외 발생
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", userId);
                    return new NotFoundException("User not found");
                });

        // 신고 정보 생성
        Report report = new Report();
        report.setMeeting(meeting);
        report.setUser(user);
        report.setReason(ReportReason.스타신고);
        report.setFilePath(null);

        // 신고 정보 저장
        reportRepository.save(report);
        log.info("Report saved");
    }

    /**
     * 사용자 신고를 취소 (삭제)
     *
     * @param meetingId 신고 취소할 미팅 ID
     * @param userId 신고 취소할 사용자 ID
     * @throws NotFoundException 신고를 찾을 수 없을 때 발생
     */
    public void cancelReport(int meetingId, int userId) {
        log.info("cancelReport called with meetingId: {} and userId: {}", meetingId, userId);

        Report report = reportRepository.findByMeeting_MeetingIdAndUser_UserId(meetingId, userId)
                .orElseThrow(() -> {
                    log.error("Report not found for meetingId: {} and userId: {}", meetingId, userId);
                    return new NotFoundException("Report not found");
                });

        reportRepository.delete(report);
        log.info("Report deleted");
    }
}
