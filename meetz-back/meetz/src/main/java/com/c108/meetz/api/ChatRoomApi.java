package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.response.ChatListResponseDto;
import com.c108.meetz.dto.response.ChatRoomListResponseDto;
import com.c108.meetz.service.ChatRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomApi {
    private final ChatRoomService chatRoomService;

    public ChatRoomApi(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @GetMapping("{meetingId}")
    ApiResponse<ChatRoomListResponseDto> getChatRoomList(@PathVariable int meetingId){
        ChatRoomListResponseDto response = chatRoomService.getChatRoomList(meetingId);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("{chatRoomId}")
    ApiResponse<ChatListResponseDto> getChatList(@PathVariable int chatRoomId){
        ChatListResponseDto response = chatRoomService.getChatList(chatRoomId);
        return ApiResponse.success(OK, response);
    }

}
