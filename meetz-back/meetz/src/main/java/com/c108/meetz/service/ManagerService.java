package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.request.JoinRequestDto;
import com.c108.meetz.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinManager(JoinRequestDto joinRequestDto){
        Manager manager = joinRequestDto.toManager(bCryptPasswordEncoder);
        managerRepository.save(manager);
    }
}
