package com.c108.meetz.api;

import com.c108.meetz.dto.request.ChatInfo;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.service.ChatService;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

@Controller
@RequiredArgsConstructor
public class ChatApi {

    private final SimpMessageSendingOperations sendingOperations;
    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;
    private final ChatService chatService;

    @MessageMapping("/api/chat")
    public void chat(ChatInfo chat) {
        String role = chat.getSenderRole();
        String email = SecurityUtil.getCurrentUserEmail();
        int id =0;
        if(role.equals("FAN")) {
            id = userRepository.findByEmail(email).get().getUserId();
        }
        else if(role.equals("MANAGER")){
            id = managerRepository.findByEmail(email).get().getManagerId();
        }
        chat.setSenderId(id);
        chatService.saveChat(chat);
        sendingOperations.convertAndSend("/sub/chatRoom/" + chat.getChatRoomId(), chat);

    }

}
