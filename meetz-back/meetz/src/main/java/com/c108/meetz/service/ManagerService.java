package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.request.JoinRequestDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static com.c108.meetz.constants.ErrorCode.DUPLICATE_EMAIL;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinManager(JoinRequestDto joinRequestDto){
        if(managerRepository.findByEmail(joinRequestDto.getEmail()).isPresent()){
            throw new BadRequestException("이미 가입된 이메일입니다.");
        }
        Manager manager = joinRequestDto.toManager(bCryptPasswordEncoder);
        managerRepository.save(manager);
    }
}
