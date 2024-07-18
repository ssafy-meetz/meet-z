package com.c108.meetz.api;

import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.service.MailService;
import com.c108.meetz.service.ManagerService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledExecutorService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager")
public class ManagerApi {

    private final ManagerService managerService;
    private final ManagerRepository managerRepository;
    private final MailService mailService;
    //일정 시간이 지나면 map에서 삭제를 시키면 된다. (시간 설정은 어떻게???)
    //하지만 서버에 저장하면 여러명의 메일 요청이 올 때 서버에 부하(메모리 차지함) => DB에 저장하는게 서버 부하 측면에서 더 효율성이 있음
    private Map<String, Integer> mapCode = new HashMap<>(); // 이메일, 인증코드를 담고 있는 맵

    @GetMapping("/authemail")
    public String authEmail(@RequestParam String email) {


        int sendedNum = mailService.sendMail(email);

        return "tmp";
    }


}
