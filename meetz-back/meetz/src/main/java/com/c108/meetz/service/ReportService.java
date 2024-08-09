package com.c108.meetz.service;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.ReportResponseDto;
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

import java.time.LocalDateTime;
import java.util.Optional;

import static com.c108.meetz.domain.Role.STAR;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    // 현재 로그인된 스타의 ID를 가져오는 메서드
    private int getCurrentUserId() {
        String email = SecurityUtil.getCurrentUserEmail();  // 이메일로 사용자 식별
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        return user.getUserId();
    }

    // 현재 스타의 진행 중인 미팅 ID를 반환하는 메서드
    private int getCurrentMeetingIdForStar() {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        return user.getMeeting().getMeetingId(); // 현재 스타가 속한 미팅 ID 반환
    }

    /**
     * 특정 팬에 대한 신고를 저장하는 메서드
     *
     * @param fanId 신고할 사용자의 ID
     */
    public void saveReport(int fanId) {
        // 현재 로그인된 스타의 ID를 가져옴
        int starId = getCurrentUserId();
        log.info("saveReport called with starId: {} and fanId: {}", starId, fanId);

        // 현재 사용자가 스타인지 확인
        if (!SecurityUtil.getCurrentUserRole().equals("STAR")) {
            log.error("접근 권한이 없습니다.");
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        // 현재 스타의 진행 중인 미팅 ID 가져옴
        int meetingId = getCurrentMeetingIdForStar();

        // 동일한 미팅과 사용자에 대한 신고가 이미 존재하는지 확인
        Optional<Report> existingReport = reportRepository.findByMeeting_MeetingIdAndFan_UserId(meetingId, fanId);
        if (existingReport.isPresent()) {
            log.error("이미 신고하였습니다.");
            throw new DuplicateException("이미 신고하였습니다.");
        }

        Meeting meeting = userRepository.findById(starId)
                .map(User::getMeeting)
                .orElseThrow(() -> new NotFoundException("Meeting not found"));

        User star = userRepository.findById(starId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        User fan = userRepository.findById(fanId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Report 엔티티 생성 및 저장
        Report report = new Report(meeting, star, fan, true, false, null);
        reportRepository.save(report);

        log.info("Report saved successfully without file path");
    }

    /**
     * 사용자 신고를 취소 (삭제)하는 메서드
     *
     * @param userId 신고 취소할 사용자 ID
     */
    public void cancelReport(int userId) {
        // 현재 로그인된 스타의 ID를 가져옴
        int starId = getCurrentUserId();
        log.info("cancelReport called with starId: {} and userId: {}", starId, userId);

        // 현재 스타의 진행 중인 미팅 ID를 가져옴
        int meetingId = getCurrentMeetingIdForStar();

        // 신고 정보 조회, 없으면 예외 발생
        Report report = reportRepository.findByMeeting_MeetingIdAndFan_UserId(meetingId, userId)
                .orElseThrow(() -> {
                    log.error("Report not found for meetingId: {} and userId: {}", meetingId, userId);
                    return new NotFoundException("Report not found");
                });

        // 신고 정보 삭제
        reportRepository.delete(report);
        log.info("Report deleted successfully for meetingId: {} and userId: {}", meetingId, userId);
    }
}

