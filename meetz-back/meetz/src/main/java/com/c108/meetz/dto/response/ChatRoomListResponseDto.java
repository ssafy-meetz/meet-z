package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ChatRoomListResponseDto {
    List<ChatRoomList> rooms;
    private ChatRoomListResponseDto(List<ChatRoomList> rooms){
        this.rooms = rooms;
    }

    public static ChatRoomListResponseDto from(List<ChatRoomList> rooms){
        return new ChatRoomListResponseDto(rooms);
    }

    @Getter
    @Setter
    public static class ChatRoomList {
        int chatRoomId;
        String name; //팬 이름
        String recentChat;
        @JsonFormat(pattern="MM/dd HH:mm")
        LocalDateTime recentDate;

        public static ChatRoomList of (ChatRoom chatRoom, Chat chat) {
            ChatRoomList chatRoomList = new ChatRoomList();
            chatRoomList.setChatRoomId(chatRoom.getChatRoomId());
            chatRoomList.setName(chatRoom.getUser().getName());
            if (chat == null) {
                chatRoomList.setRecentChat(null);
                chatRoomList.setRecentDate(null);
            } else {
                chatRoomList.setRecentChat(chat.getContent());
                chatRoomList.setRecentDate(chat.getCreatedAt());
            }
            return chatRoomList;
        }

    }
}
