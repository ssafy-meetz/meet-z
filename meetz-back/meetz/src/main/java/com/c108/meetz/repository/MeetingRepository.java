package com.c108.meetz.repository;

import com.c108.meetz.domain.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {

    @Query("SELECT m FROM Meeting m WHERE m.manager.managerId = :managerId AND m.meetingEnd < :currentTime")
    List<Meeting> findCompletedMeetingsByManagerId(@Param("managerId") int managerId, @Param("currentTime") LocalDateTime currentTime);

    @Query("SELECT m FROM Meeting m WHERE m.manager.managerId = :managerId AND m.meetingEnd >= :currentTime")
    List<Meeting> findIncompleteMeetingsByManagerId(@Param("managerId") int managerId, @Param("currentTime") LocalDateTime currentTime);
}
