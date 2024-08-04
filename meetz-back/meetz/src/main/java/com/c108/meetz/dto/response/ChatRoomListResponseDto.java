package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Chat;
import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Comparator;
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
        int userId;
        String recentChat;
        LocalDateTime recentDate;

        public static final Comparator<ChatRoomList> BY_RECENT_DATE_DESC = Comparator
                .comparing(ChatRoomList::getRecentDate, Comparator.nullsLast(Comparator.reverseOrder()));
        public static ChatRoomList of (ChatRoom chatRoom, Chat chat, User user) {
            ChatRoomList chatRoomList = new ChatRoomList();
            chatRoomList.setChatRoomId(chatRoom.getChatRoomId());
            chatRoomList.setName(user.getName());
            chatRoomList.setUserId(user.getUserId());
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
