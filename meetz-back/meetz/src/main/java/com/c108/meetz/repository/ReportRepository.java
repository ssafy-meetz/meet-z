package com.c108.meetz.repository;

import com.c108.meetz.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    // 특정 미팅에서 특정 팬을 신고한 기록이 있는지 확인
    Optional<Report> findByMeeting_MeetingIdAndFan_UserId(int meetingId, int userId);
}
