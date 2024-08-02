package com.c108.meetz.api;

import com.c108.meetz.dto.request.ChatDto;
import com.c108.meetz.service.ChatService;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

@Controller
@RequiredArgsConstructor
public class ChatApi {

    private final SimpMessageSendingOperations sendingOperations;
    private final ChatService chatService;

    @MessageMapping("/api/chat")
    public void chat(ChatDto chat) {
        sendingOperations.convertAndSend("/sub/chatRoom/" + chat.getChatRoomId(), chat);
        chatService.saveChat(chat);
    }
}
