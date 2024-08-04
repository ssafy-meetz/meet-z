package com.c108.meetz.repository;

import com.c108.meetz.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    Optional<ChatRoom> findByMeeting_MeetingId(int meetingId);

}
