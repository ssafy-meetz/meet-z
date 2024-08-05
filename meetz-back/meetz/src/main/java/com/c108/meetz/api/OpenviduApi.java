package com.c108.meetz.api;

import com.c108.meetz.domain.Role;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.service.OpenviduService;
import com.c108.meetz.service.SseService;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class OpenviduApi {

    private final SimpUserRegistry userRegistry;
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private final OpenviduService openviduService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @GetMapping("/test/{meetingId}")
    public ApiResponse<Void> test(@PathVariable("meetingId") int meetingId) {

        openviduService.automateMeetingRoom(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }


    @GetMapping("/test1/{meetingId}")
    public ApiResponse<Void> test1(@PathVariable("meetingId") int meetingId) {

        openviduService.registMeetingInfo(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //1: 미팅방의 세션을 생성하는 api
    @PostMapping("/vidu/{meetingId}")
    public ApiResponse<Void> initRoomSession(@PathVariable("meetingId") int meetingId) throws OpenViduJavaClientException, OpenViduHttpException {

        openviduService.initSession(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //2: 방 세션에 연결하고 토큰을 넘겨주는 api
    @GetMapping("/vidu/{meetingId}/{starIdx}")
    public ApiResponse<String> participateSession(@PathVariable("meetingId") int meetingId, @PathVariable("starIdx") int starIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        String token = openviduService.getToken(meetingId, starIdx);

        if (token == null) {
            ApiResponse.error(HttpStatus.NOT_FOUND);
        }

        return ApiResponse.success(HttpStatus.OK, token);
    }

    //3: 방에 있는 세션 삭제하는 api
    @DeleteMapping("/vidu/{meetingId}")
    public ApiResponse<Void> delRoomSession(@PathVariable("meetingId") int meetingId) throws OpenViduJavaClientException, OpenViduHttpException {
        openviduService.deleteMeetingRoom(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //optional: 현재 모든 연결된 세션을 확인하는 api
    @GetMapping("/vidu/all")
    public ApiResponse<String> getAllSessions() {

        List<Session> activeSessions = openvidu.getActiveSessions();

        StringBuilder sb = new StringBuilder();
        sb.append(activeSessions.size());
        for (Session session : activeSessions) {
            sb.append(session.getSessionId()).append("\n");
        }

        return ApiResponse.success(HttpStatus.OK, sb.toString());
    }

    //optional: 방의 세션을 확인하는 api
    @GetMapping("/vidu/all/{meetingId}")
    public ApiResponse<String> getRoomSessions(@PathVariable("meetingId") int meetingId) {

        List<Session> sessions = openviduService.getMeetingRooms(meetingId);
        StringBuilder sb = new StringBuilder();
        if (sessions != null) {
            log.info("size = {}", sessions.size());
            for (Session session : sessions) {
                sb.append(session.getSessionId()).append("\n");
                sb.append("------------").append("\n");
            }
        }

        return ApiResponse.success(HttpStatus.OK, sb.toString());
    }

    //testCode: 세션을 생성하는 함수
    @PostMapping("/vidu")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    //testCode: 방 접속 토큰을 주는 api(기본 코드)
    @PostMapping("/vidu/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    //======================================SSE 관련 api 시작======================================//

    //1: 방이 만들어진 후에 팬 정보를 map에 넣는 함수
    @PostMapping(path = "/sse/{meetingId}")
    public ApiResponse<Void> initFanInfo(@PathVariable("meetingId") int meetingId) {

        boolean check = openviduService.initFanInfo(meetingId);

        if (!check) {
            //무지성 not_found
            return ApiResponse.error(HttpStatus.NOT_FOUND);
        }

        return ApiResponse.success(HttpStatus.OK);
    }


    //2: sse연결 시작
    @GetMapping(path = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {

        SseEmitter emitter = openviduService.subscribFan();

        return emitter;
    }

    //test : 모든 클라이언트들에게 메세지 전달
    @GetMapping(path = "/sse/broadcast")
    public ApiResponse<String> boardcastTest(@RequestParam("meetingId") int meetingId) throws IOException {
        openviduService.broadcastFan(meetingId);
        log.info("Broadcasted completed");
        return ApiResponse.success(HttpStatus.OK, "Broadcast completed");
    }

    //test: 특정 클라이언트에게 메세지 전달
    @GetMapping(path = "/sse/send")
    public ApiResponse<String> sendEvent(@RequestParam("meetingId") int meetingId, @RequestParam("email") String email)
            throws IOException, OpenViduJavaClientException, OpenViduHttpException {

        openviduService.sendEventToFan(meetingId, email, 0);

        return ApiResponse.success(HttpStatus.OK, "Send completed");
    }



}
