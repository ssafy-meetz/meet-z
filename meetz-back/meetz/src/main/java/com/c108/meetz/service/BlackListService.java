package com.c108.meetz.service;

import com.c108.meetz.domain.BlackList;
import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.BlackListInfoListResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.DuplicateException;
import com.c108.meetz.exception.ForbiddenException;
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
        User user = userRepository.findById(userId).orElseThrow(()->new NotFoundException("존재하지 않는 회원입니다."));
        Manager manager = getManager();
        if(user.getMeeting().getManager().getManagerId() != manager.getManagerId()){
            throw new ForbiddenException("접근 권한이 없습니다.");
        }
        if(blackListRepository.existsByNameAndPhoneAndManager_ManagerId(user.getName(), user.getPhone(), manager.getManagerId())){
            throw new BadRequestException("이미 등록된 회원입니다.");
        }

        BlackList blackList = BlackList.builder()
                .manager(manager)
                .name(user.getName())
                .phone(user.getPhone())
                .build();
        blackListRepository.save(blackList);
    }

    public BlackListInfoListResponseDto getBlackListInfoList(){
         Manager manager = getManager();
        List<BlackListInfo> list = blackListRepository.findByManager_ManagerId(manager.getManagerId()).stream()
                .map(BlackListInfo::from)
                .toList();
        return BlackListInfoListResponseDto.from(manager.getCompany(),list);
    }

    public void deleteBlackList(int blacklistId){
        Manager manager = getManager();
        BlackList blackList = blackListRepository.findById(blacklistId).orElseThrow(()-> new NotFoundException("존재하지 않는 블랙리스트입니다."));
        if(blackList.getManager().getManagerId() != manager.getManagerId()){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        blackListRepository.delete(blackList);
    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }


}
