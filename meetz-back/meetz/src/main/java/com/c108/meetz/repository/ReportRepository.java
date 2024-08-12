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

    // 리포트가 존재하는지 확인하는 메서드 추가
    boolean existsByMeeting_MeetingIdAndFan_UserIdAndStar_UserId(int meetingId, int fanId, int starId);

    // 기존 메서드 수정: Optional을 반환하지 않도록 변경
    Report findByMeeting_MeetingIdAndFan_UserIdAndStar_UserId(int meetingId, int fanId, int starId);
}
