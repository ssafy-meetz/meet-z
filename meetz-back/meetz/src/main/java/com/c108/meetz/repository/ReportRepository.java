package com.c108.meetz.repository;

import com.c108.meetz.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByMeeting_MeetingIdAndUser_UserId(int meetingId, int userId);
}
