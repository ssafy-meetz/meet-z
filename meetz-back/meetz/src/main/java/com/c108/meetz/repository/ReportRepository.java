package com.c108.meetz.repository;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findByMeeting_MeetingId(int meetingId);

    Optional<Report> findByMeeting_MeetingIdAndFan_UserIdAndStar_UserId(int meetingId, int fanId, int starId);
}
