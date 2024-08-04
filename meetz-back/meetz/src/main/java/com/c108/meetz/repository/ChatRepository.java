package com.c108.meetz.repository;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.domain.ChatRoom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("select c from Chat c where c.chatRoom =:chatRoom and ((c.senderId=:userId and c.senderRole ='FAN') or (c.receiverId=:userId and c.senderRole='MANAGER')) order by c.createdAt")
    List<Chat> findRecentChatByChatRoomAndUserId(ChatRoom chatRoom, int userId, Pageable pageable);

    @Query("select c from Chat c where c.chatRoom =:chatRoom and ((c.senderId=:userId and c.senderRole ='FAN') or (c.receiverId=:userId and c.senderRole='MANAGER')) order by c.createdAt")
    List<Chat> findAllByChatRoomAndUserId(ChatRoom chatRoom, int userId);
}
