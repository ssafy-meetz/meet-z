package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Chat;
import lombok.Getter;
import lombok.Setter;

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
    @Setter
    public static class ChatList {
        int chatId;
        boolean sender;
        String content;
        LocalDateTime createdAt;

        public static ChatList of (Chat chat, boolean sender){
            ChatList chatList = new ChatList();
            chatList.setChatId(chat.getChatId());
            chatList.setSender(sender);
            chatList.setContent(chat.getContent());
            chatList.setCreatedAt(chat.getCreatedAt());
            return chatList;

        }

    }

}
