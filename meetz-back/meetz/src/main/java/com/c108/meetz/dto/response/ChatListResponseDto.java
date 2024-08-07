package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.dto.request.ChatInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ChatListResponseDto {
    int fanId;
    int managerId;
    List<ChatInfo> chats;

    private ChatListResponseDto(int fanId, int managerId, List<ChatInfo> chats) {
        this.fanId = fanId;
        this.managerId = managerId;
        this.chats = chats;

    }

    public static ChatListResponseDto from(int fanId, int managerId, List<ChatInfo> chats) {
        return new ChatListResponseDto(fanId, managerId,chats);
    }

}


