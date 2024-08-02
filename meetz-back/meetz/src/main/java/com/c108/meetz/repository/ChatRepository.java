package com.c108.meetz.repository;

import com.c108.meetz.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("select c from Chat c where c.chatRoom.chatRoomId =: chatRoomId order by c.createdAt desc limit 1")
    Chat findFirstChatByChatRoomId(int chatRoomId);

    @Query("select c from Chat c where c.chatRoom.chatRoomId =: chatRoomId order by c.createdAt")
    List<Chat> findAllChatByChatRoomId(int chatRoomId);
}
