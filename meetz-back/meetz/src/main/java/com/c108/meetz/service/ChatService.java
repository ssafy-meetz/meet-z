package com.c108.meetz.service;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.ChatDto;
import com.c108.meetz.dto.response.ChatListResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.ChatRepository;
import com.c108.meetz.repository.ChatRoomRepository;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;
    private final ChatRepository chatRepository;

    public void saveChat(ChatDto chatDto){
        String role = SecurityUtil.getCurrentUserRole();
        String email = SecurityUtil.getCurrentUserEmail();
        int id = getId(role, email);
        ChatRoom chatRoom = chatRoomRepository.findById(chatDto.getChatRoomId()).orElseThrow(()->
                new NotFoundException("chatroom not found"));
        Chat chat = Chat.builder()
                .chatRoom(chatRoom)
                .role(role)
                .senderId(id)
                .content(chatDto.getContent())
                .build();
        chatRepository.save(chat);
        chatRoom.setRecentChat(LocalDateTime.now());
    }

    private int getId(String role, String email){
        if(role.equals("FAN")){
            return userRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("user not found")).getUserId();
        }
        else{
            return managerRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("manager not found")).getManagerId();
        }
    }


}
