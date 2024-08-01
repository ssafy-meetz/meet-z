package com.c108.meetz.dto.response;

import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

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
    public static class ChatRoomList {
        int chatRoomId;
        String name; //팬 이름
        String recentChat;
        @JsonFormat(pattern="MM/dd HH:mm")
        LocalDateTime recentDate;

        public ChatRoomList(ChatRoom chatRoom, User user, String recentChat){
            this.chatRoomId = chatRoom.getChatRoomId();
            this.name = user.getName();
            this.recentChat = recentChat;
            if(recentChat == null){
                this.recentDate = null;
            }else{
                this.recentDate = chatRoom.getRecentChat();
            }
        }

    }
}
