package com.c108.meetz.repository;

import com.c108.meetz.domain.Warning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WarningRepository extends JpaRepository<Warning, Integer> {

    // 특정 매니저의 이름과 전화번호로 경고 횟수 조회
    @Query("SELECT COUNT(w) FROM Warning w WHERE w.name = :name AND w.phone = :phone AND w.meeting.manager.managerId = :managerId")
    int countByNameAndPhoneAndManagerId(@Param("name") String name, @Param("phone") String phone, @Param("managerId") int managerId);

    // 이름과 전화번호, 미팅 ID로 경고 존재 여부 확인
    boolean existsByNameAndPhoneAndMeeting_MeetingId(String name, String phone, int meetingId);
}
