package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.response.ChatListResponseDto;
import com.c108.meetz.dto.response.ChatRoomListResponseDto;
import com.c108.meetz.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class ChatRoomApi {
    private final ChatRoomService chatRoomService;

    @GetMapping("/{meetingId}")
    ApiResponse<ChatRoomListResponseDto> getChatRoomList(@PathVariable int meetingId){
        ChatRoomListResponseDto response = chatRoomService.getChatRoomList(meetingId);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/{meetingId}/{userId}")
    ApiResponse<ChatListResponseDto> getChatListForManager(@PathVariable int meetingId, @PathVariable int userId){
        ChatListResponseDto response = chatRoomService.getChatListForManager(meetingId, userId);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/fan")
    ApiResponse<ChatListResponseDto> getChatListForFan(){
        ChatListResponseDto response = chatRoomService.getChatListForFan();
        return ApiResponse.success(OK, response);
    }

}
