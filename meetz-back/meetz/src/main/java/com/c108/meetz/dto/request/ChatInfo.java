package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Chat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatInfo {
    private int chatRoomId; //채팅방 아이디
    private String senderRole;
    private int senderId;
    private int receiverId;
    private String content; //메시지 내용
    LocalDateTime createdAt;

    public static ChatInfo from(Chat chat){
        ChatInfo chatInfo = new ChatInfo();
        chatInfo.setChatRoomId(chat.getChatRoom().getChatRoomId());
        chatInfo.setSenderRole(chat.getSenderRole());
        chatInfo.setSenderId(chat.getSenderId());
        chatInfo.setReceiverId(chat.getReceiverId());
        chatInfo.setContent(chat.getContent());
        chatInfo.setCreatedAt(chat.getCreatedAt());
        return chatInfo;
    }
}

