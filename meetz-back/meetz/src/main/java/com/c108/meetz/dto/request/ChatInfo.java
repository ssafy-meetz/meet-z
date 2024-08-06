package com.c108.meetz.dto.request;

import lombok.Data;

@Data
public class ChatInfo {
    private int chatRoomId; //채팅방 아이디
    private String senderRole;
    private int senderId;
    private int receiverId;
    private String content; //메시지 내용
}
