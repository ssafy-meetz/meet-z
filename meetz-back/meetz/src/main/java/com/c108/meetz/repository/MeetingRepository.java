package com.c108.meetz.repository;

import com.c108.meetz.domain.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {

    @Query("SELECT m FROM Meeting m WHERE m.manager.managerId = :managerId AND m.meetingEnd < :currentTime order by m.meetingStart desc")
    List<Meeting> findCompletedMeetingsByManagerId(@Param("managerId") int managerId, @Param("currentTime") LocalDateTime currentTime);

    @Query("SELECT m FROM Meeting m WHERE m.manager.managerId = :managerId AND m.meetingEnd >= :currentTime order by m.meetingStart asc")
    List<Meeting> findIncompleteMeetingsByManagerId(@Param("managerId") int managerId, @Param("currentTime") LocalDateTime currentTime);

    @Query("SELECT m FROM Meeting m WHERE m.meetingStart >= :startTime AND m.meetingStart <= :endTime ORDER BY m.meetingStart ASC")
    List<Meeting> findMeetingsInTimeRange(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);

//    @Query("SELECT m FROM Meeting m WHERE m.meetingStart <= :currentTime - 300000 AND m.meetingEnd >= :currentTime + 300000 order by m.meetingStart asc")
//    List<Meeting> findScheduledMeetingsByManagerId(@Param("managerId") int managerId, @Param("currentTime") LocalDateTime currentTime);

    // 미팅 참가자 수 계산
    @Query("SELECT COUNT(u) FROM User u WHERE u.meeting.meetingId = :meetingId AND u.role = 'FAN'")
    int countFansInMeeting(@Param("meetingId") int meetingId);
}
