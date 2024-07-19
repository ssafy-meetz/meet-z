package com.c108.meetz.api;

import com.c108.meetz.constants.ErrorCode;
import com.c108.meetz.constants.SuccessCode;
import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.ManagerJoinRequest;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.service.MailService;
import com.c108.meetz.service.ManagerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.c108.meetz.constants.ErrorCode.*;
import static com.c108.meetz.constants.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager")
public class ManagerApi {

    private final ManagerService managerService;
    private final ManagerRepository managerRepository;
    private final MailService mailService;


    @PostMapping("/join")
    public ApiResponse<Void> joinManager(@Valid @RequestBody ManagerJoinRequest joinRequest) {

        Manager manager = new Manager();

        //이메일
        manager.setEmail(joinRequest.getEmail());
        //비밀번호
        manager.setPassword(joinRequest.getPassword());
        //회사
        manager.setCompany(joinRequest.getCompany());
        //전화번호
        manager.setPhone(joinRequest.getPhone());

        managerRepository.save(manager);

        return ApiResponse.success(JOIN_SUCCESS);
    }

    @GetMapping("/authemail")
    public ApiResponse<Void> authEmail(@RequestParam(value="email") String email) {

        //메일 보내고 UUID 받기
        int sendedNum = mailService.sendMail(email);
        log.info("email={}  ", email);
        //redis에 <email, sendedNum> 넣기
        mailService.saveEmail(email, Integer.toString(sendedNum));
        return ApiResponse.success(SUCCESS);
    }

    @GetMapping("/checkemail")
    public ApiResponse<Void> getEmail(@RequestParam(value="email") String email, @RequestParam(value="sendedNum") String sendedNum) {

        String redisEmail = mailService.getEmail(sendedNum);

        if (redisEmail != null && redisEmail.equals(email)) {
            mailService.delEmail(sendedNum);
            return ApiResponse.success(VERIFICATION_CODE_MATCH);
        }
        return ApiResponse.error(INVALID_VERIFICATION_CODE);
    }


}
