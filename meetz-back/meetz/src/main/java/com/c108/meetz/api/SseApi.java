package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/sse")
public class SseApi {

    private final SseService sseService;

    //sse연결 시작
    @GetMapping(path = "/connect/{email}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable("email") String email){
        SseEmitter emitter = sseService.subscrib(email);
        log.info("Subscribed to {}", emitter);
        return emitter;
    }

    //모든 클라이언트들에게 메세지 전달
    @GetMapping(path = "/broadcast")
    public ApiResponse<String> boardcastTest(@RequestParam("message") String message){
        sseService.broadcast(message);
        log.info("Broadcasted completed");
        return ApiResponse.success(HttpStatus.OK, "Broadcast completed");
    }

    //특정 클라이언트에게 메세지 전달
    @GetMapping(path = "/send")
    public ApiResponse<String> sendEvent(@RequestParam("email") String email, @RequestParam("message") String message){

        sseService.sendEvent(email, message);

        return ApiResponse.success(HttpStatus.OK, "Send completed");
    }

    //모든 클라이언트의 이메일 확인(확인용)
    @GetMapping(path = "/getEmitters")
    public ApiResponse<String> getAllClientId(){

        List<String> allClientEmail = sseService.getAllClientEmail();

        StringBuilder sb = new StringBuilder();

        for (String email : allClientEmail) {
            sb.append(email).append("\n");
        }
        return ApiResponse.success(HttpStatus.OK, sb.toString());
    }

}
