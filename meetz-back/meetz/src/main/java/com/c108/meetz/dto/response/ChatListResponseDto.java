package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Chat;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ChatListResponseDto {
    List<ChatList> chats;

    private ChatListResponseDto(List<ChatList> chats) {
        this.chats = chats;
    }

    public static ChatListResponseDto from(List<ChatList> chats) {
        return new ChatListResponseDto(chats);
    }
    @Getter
    public static class ChatList {
        int chatId;
        boolean sender;
        String content;

        @JsonFormat(pattern = "MM/dd HH:mm")
        LocalDateTime createdAt;

        public ChatList(Chat chat, boolean sender){
            this.chatId = chat.getChatId();
            this.sender = sender;
            this.content = chat.getContent();
            this.createdAt = chat.getCreatedAt();
        }

    }

}
