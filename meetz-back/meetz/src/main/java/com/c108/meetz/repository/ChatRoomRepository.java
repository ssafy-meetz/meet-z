package com.c108.meetz.repository;

import com.c108.meetz.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    @Query("select r from ChatRoom r where r.meeting.meetingId =: meetingId order by r.recentChat desc")
    List<ChatRoom> findByMeetingId(int meetingId);
}
