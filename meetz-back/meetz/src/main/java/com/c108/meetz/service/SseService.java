package com.c108.meetz.service;

import java.io.IOError;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import com.c108.meetz.domain.Role;
import com.c108.meetz.domain.User;
import com.c108.meetz.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class SseService {

    private final UserRepository userRepository;

    public SseService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //내부에서 관리되는 클래스니 따로 getter, setter는 만들지 않겠다.
    static class FanInfo {
        String email; //팬의 이메일
        SseEmitter emitter; //팬의 에미터

        public FanInfo(String email) {
            this.emitter = null;
            this.email = email;
        }
    }

    //preEmitterMap
    private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    //newEmitterMap key: meetingId, value : SseEmitter List
    private final Map<Integer, List<FanInfo>> newEmitterMap = new ConcurrentHashMap<>();

    private static final long TIMEOUT = 24 * 60 * 60 * 1000; //1000ms = 1s
    private static final long RECONNECTION_TIMEOUT = 1000L;

    //방별 팬 정보를 넣는 함수
    public boolean initFanInfo(int meetingId) {

        //이미 정보가 있다면?
        if (!newEmitterMap.containsKey(meetingId)) {
            return false;
        }

        //리스트 생성
        newEmitterMap.put(meetingId, new ArrayList<>());

        List<FanInfo> fanInfos = newEmitterMap.get(meetingId);

        //팬의 정보 불러오기(기본적으로 오른차순이니 순서가 보장된다)
        List<User> users = userRepository.findByMeeting_MeetingIdAndRole(meetingId, Role.FAN);

        //유저 정보가 없다면?
        if (users.isEmpty()) {
            return false;
        }
        //유저정보 입력
        for (User user : users) {
            fanInfos.add(new FanInfo(user.getEmail()));
        }
        return true;
    }

    //emitter를 만들어서 클라이언트에게 전달
    public SseEmitter subscribFan(int meetingId, String email) {

        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitterConfig(emitter, email);

        newEmitterMap.get(meetingId).add(new FanInfo(email));
        return emitter;
    }

    //이전에 만든 Emitter 생성
    public SseEmitter subscrib(String id) {
        //emitter 생성
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitterConfig(emitter, id);

        //emitter 등록
        emitterMap.put(id, emitter);
        return emitter;
    }

    //emitter 세팅
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

    //방의 모든 팬들에게 정보 전달
    public void broadcastFan(int meetingId) throws IOException {

        List<FanInfo> fanInfos = newEmitterMap.get(meetingId);

        for (FanInfo fanInfo : fanInfos) {
            fanInfo.emitter.send(fanInfo.email);
        }

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

    //특정 팬에게 이메일 보내기
    public void sendEventToFan(int meetingId, String email) throws IOException {
        SseEmitter sseEmitter = null;

        List<FanInfo> fanInfos = newEmitterMap.get(meetingId);

        for (FanInfo fanInfo : fanInfos) {
            if (fanInfo.email.equals(email)) {
                sseEmitter = fanInfo.emitter;
                break;
            }
        }

        if (sseEmitter == null) {
            return;
        }

        sseEmitter.send(email);
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