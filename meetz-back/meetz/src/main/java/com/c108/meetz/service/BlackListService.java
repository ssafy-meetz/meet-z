package com.c108.meetz.service;

import com.c108.meetz.domain.BlackList;
import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.BlackListInfoListResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.BlackListRepository;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.c108.meetz.dto.response.BlackListInfoListResponseDto.*;

@Service
@RequiredArgsConstructor
public class BlackListService {

    private final UserRepository userRepository;
    private final BlackListRepository blackListRepository;
    private final ManagerRepository managerRepository;

    public void saveBlackList(int userId){
        User user = userRepository.findById(userId).orElseThrow(()->new BadRequestException("존재하지 않는 회원입니다."));
        Manager manager = getManager();
        BlackList blackList = BlackList.builder()
                .manager(manager)
                .name(user.getName())
                .email(user.getOriginEmail())
                .phone(user.getPhone())
                .build();
        blackListRepository.save(blackList);
    }

    public BlackListInfoListResponseDto getBlackListInfoList(){
         Manager manager = getManager();
        List<BlackListInfo> list = blackListRepository.findByManager_ManagerId(manager.getManagerId()).stream()
                .map(BlackListInfo::from)
                .toList();
        return BlackListInfoListResponseDto.from(list);
    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }
}
