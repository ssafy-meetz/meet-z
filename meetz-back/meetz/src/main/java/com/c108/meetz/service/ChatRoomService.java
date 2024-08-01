package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.response.ChatRoomListResponseDto;
import com.c108.meetz.dto.response.ChatRoomListResponseDto.ChatRoomList;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.ChatRoomRepository;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ManagerRepository managerRepository;



    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }

}
