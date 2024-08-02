package com.c108.meetz.service;

import com.c108.meetz.domain.*;
import com.c108.meetz.dto.response.ChatListResponseDto;
import com.c108.meetz.dto.response.ChatRoomListResponseDto;
import com.c108.meetz.dto.response.ChatRoomListResponseDto.ChatRoomList;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.*;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import static com.c108.meetz.dto.response.ChatListResponseDto.*;


import java.util.List;


@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final ManagerRepository managerRepository;
    private final MeetingRepository meetingRepository;

    public ChatRoomListResponseDto getChatRoomList(int meetingId){
        Manager manager = getManager();
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(()->new NotFoundException("Meeting not found"));
        if(meeting.getManager().getManagerId() != manager.getManagerId()){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        List<ChatRoomList> rooms = chatRoomRepository.findByMeetingId(meetingId).stream()
                .map(room -> {
                    Chat chat = chatRepository.findFirstChatByChatRoomId(room.getChatRoomId());
                    return ChatRoomList.of(room, chat);
                })
                .toList();
        return ChatRoomListResponseDto.from(rooms);
    }


    public ChatListResponseDto getChatList(int chatRoomId){
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(()-> new NotFoundException("chatRoom not found"));
        String role = SecurityUtil.getCurrentUserRole();
        List<ChatList> chats = chatRepository.findAllChatByChatRoomId(chatRoomId).stream()
                .map(chat -> ChatList.of(chat, chat.getRole().equals(role)))
                .toList();
        return ChatListResponseDto.from(chats);
//        if(role.equals("FAN")){
//            User user = getUser(meetingId);
//            chats = chatRepository.findAllChatByChatRoomId(chatRoomId).stream()
//                    .map(chat -> ChatList.of(chat, chat.getRole().equals(role)))
//                    .toList();
//        }else{
//            Manager manager = getManager();
//            chats = chatRepository.findAllChatByChatRoomId(chatRoomId).stream()
//                    .map(chat -> ChatList.of(chat, chat.getRole().equals(role)))
//                    .toList();
//        }

    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }
    private User getUser(int meetingId){
        String email = SecurityUtil.getCurrentUserEmail();
        return userRepository.findByEmailAndMeeting_MeetingId(email, meetingId).orElseThrow(()->
                new NotFoundException("user not found"));
    }

}
