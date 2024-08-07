package com.c108.meetz.service;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.dto.request.ChatInfo;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.ChatRepository;
import com.c108.meetz.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;

    public Chat saveChat(ChatInfo chatInfo){
        ChatRoom chatRoom = chatRoomRepository.findById(chatInfo.getChatRoomId()).orElseThrow(()->
                new NotFoundException("chatroom not found"));
        Chat chat = Chat.builder()
                .chatRoom(chatRoom)
                .senderRole(chatInfo.getSenderRole())
                .senderId(chatInfo.getSenderId())
                .receiverId(chatInfo.getReceiverId())
                .content(chatInfo.getContent())
                .build();
        return chatRepository.save(chat);
    }

}
