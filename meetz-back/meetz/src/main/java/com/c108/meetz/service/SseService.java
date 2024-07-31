package com.c108.meetz.service;

import java.io.IOError;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class SseService {

    private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();
    private static final long TIMEOUT = 60 * 1000 * 10;
    private static final long RECONNECTION_TIMEOUT = 1000L;


    public SseEmitter subscrib(String id) {
        //emitter 생성
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitterConfig(emitter, id);

        //emitter 등록
        emitterMap.put(id, emitter);
        return emitter;
    }

    public void emitterConfig(SseEmitter emitter, String id) {
        emitter.onTimeout(() -> {
            log.info("server sent event timed out : id={}", id);
            emitter.complete();
        });

        //에러 핸들러 등록
        emitter.onError(e -> {
            log.info("server sent event error : id={}, message={}", id, e.getMessage());
            emitter.complete();
        });

        //SSE complete 핸들러 등록
        emitter.onCompletion(() -> {
            if (emitterMap.remove(id) != null) {
                log.info("server sent event removed in emitter cache: id={}", id);
            }
            log.info("disconnected by completed server sent event : id={}", id);
        });
    }

    //모두에게 보내기
    public void broadcast(String str) {
       emitterMap.forEach((id, emitter) -> {
           try {
               emitter.send(id + ": " + str);
           } catch (IOException e) {
               log.error("failed to send event : id={}, message={}", id, e.getMessage());
           }
       });
    }

    //특정 인원에게 보내기
    public boolean sendEvent(String email, String str) {
        SseEmitter emitter = emitterMap.get(email);
        if (emitter == null) {
            return false;
        }

        try {
            emitter.send(email + ": " + str);
        } catch (IOException e) {
            log.error("failed to send event : id={}, message={}", email, e.getMessage());
        }
        return true;
    }

    public List<String> getAllClientEmail() {
        List<String> list = emitterMap.keySet().stream().toList();
        return list;
    }


}