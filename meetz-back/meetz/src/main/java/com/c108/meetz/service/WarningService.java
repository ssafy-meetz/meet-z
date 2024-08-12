package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.domain.Warning;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.ForbiddenException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.BlackListRepository;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.repository.WarningRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WarningService {

    private final UserRepository userRepository;
    private final WarningRepository warningRepository;
    private final BlackListRepository blackListRepository;
    private final BlackListService blackListService;
    private final ManagerRepository managerRepository;
    private final MailService mailService;

    // 경고를 저장하고, 필요 시 블랙리스트에 추가하는 메서드
    public void saveWarning(int userId, String reason) {
        // 유저가 존재하는지 확인. userRepository를 사용해 userId로 User 객체를 찾고, 없으면 NotFoundException을 발생시킴
        System.out.println("Attempting to find user with ID: " + userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        System.out.println("User found: " + user.getName());

        // 유저의 이름과 전화번호, 미팅 ID를 변수로 저장
        String userName = user.getName();
        String userPhone = user.getPhone();
        int meetingId = user.getMeeting().getMeetingId();
        int managerId = getManager().getManagerId();
        System.out.println("User Details - Name: " + userName + ", Phone: " + userPhone + ", Meeting ID: " + meetingId);

        // 유저가 블랙리스트에 있는지 확인. blackListRepository를 사용해 이름과 전화번호로 블랙리스트 여부를 확인하고, 있으면 ForbiddenException 발생
        boolean isBlacklisted = blackListRepository.existsByNameAndPhoneAndManager_ManagerId(userName, userPhone, managerId);
        System.out.println("Is user blacklisted? " + isBlacklisted);
        if (isBlacklisted) {
            throw new ForbiddenException("이미 블랙리스트에 등록된 유저입니다.");
        }

        // 유저가 해당 미팅에서 이미 경고를 받은 적이 있는지 확인. warningRepository를 사용해 meetingId, userName, userPhone으로 경고 여부 확인하고, 있으면 BadRequestException 발생
        boolean isWarned = warningRepository.existsByNameAndPhoneAndMeeting_MeetingId(userName, userPhone, meetingId);
        System.out.println("Has user already been warned? " + isWarned);
        if (isWarned) {
            throw new BadRequestException("이미 경고처리된 유저입니다.");
        }

        // Warning 테이블에 경고 기록을 저장. Warning 객체를 생성하고, warningRepository를 사용해 저장
        Warning warning = Warning.builder()
                .meeting(user.getMeeting())
                .name(user.getName())
                .phone(user.getPhone())
                .reason(reason)
                .build();
        warningRepository.save(warning); // 경고 저장
        System.out.println("Warning saved for user: " + userName);

        // 경고 메일 발송
        mailService.sendWarningUser(user, reason); // 사용자에게 경고 메일을 전송

        // 경고 횟수를 조회.
        int warningCount = warningRepository.countByNameAndPhoneAndManagerId(userName, userPhone, managerId);
        System.out.println("Warning count for user: " + warningCount);

        // 경고 횟수가 3회 이상인 경우 블랙리스트에 추가. blackListService를 사용해 블랙리스트에 추가
        if (warningCount >= 3) {
            System.out.println("Adding user to blacklist due to 3 warnings: " + userName);
            blackListService.saveBlackList(userId);

            // 경고 누적에 따른 블랙리스트 등록 메일 발송
            mailService.sendWarningCountToBlacklist(user); // 사용자에게 경고 누적에 따른 블랙리스트 등록 메일을 전송
        }
    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }
}
