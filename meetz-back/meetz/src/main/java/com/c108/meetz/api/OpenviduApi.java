package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.service.OpenviduService;
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
import java.util.List;
import java.util.Map;

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
    //미팅방 생성 및 삭제를 한번에 해주는 api
    @GetMapping("/test/{meetingId}")
    public ApiResponse<Void> test(@PathVariable("meetingId") int meetingId) {

        openviduService.initSession(meetingId);
        openviduService.initFanInfo(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //미팅방 시작 테스트용 api
    @GetMapping("/test1/{meetingId}")
    public ApiResponse<Void> test1(@PathVariable("meetingId") int meetingId) {

        openviduService.automationMeetingRoom(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //1: 미팅방의 세션을 생성하는 api
    @PostMapping("/vidu/{meetingId}")
    public ApiResponse<Void> initRoomSession(@PathVariable("meetingId") int meetingId) {

        openviduService.initSession(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }

    //스타의 세션ID를 얻는 함수
    @GetMapping("/vidu/star")
    public ApiResponse<String> getStarToken() {
        String token = openviduService.getStarToken();
        return ApiResponse.success(HttpStatus.OK, token);
    }

    //2: 방 세션에 연결하고 sessionId를 넘겨주는 api
    @GetMapping("/vidu/{meetingId}/{starIdx}")
    public ApiResponse<String> participateSession(@PathVariable("meetingId") int meetingId, @PathVariable("starIdx") int starIdx) {
        String token = openviduService.getTokenV2(meetingId, starIdx);

        if (token == null) {
            ApiResponse.error(HttpStatus.NOT_FOUND);
        }

        return ApiResponse.success(HttpStatus.OK, token);
    }

    //3: 미팅방 삭제 api
    @DeleteMapping("/vidu/{meetingId}")
    public ApiResponse<Void> delRoomSession(@PathVariable("meetingId") int meetingId) {
        openviduService.endMeeting(meetingId);

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

    @GetMapping("/vidu/connection/{meetingId}")
    public ApiResponse<String> getConnectedPersonInCurrentRoom(@PathVariable("meetingId") int meetingId) {

        String str = openviduService.getConnectedPersonInCurrentRoom(meetingId);

        return ApiResponse.success(HttpStatus.OK, str);
    }

    //testCode: 세션을 생성하는 함수
    @PostMapping("/vidu")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
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

    @GetMapping(path = "/picture")
    public ApiResponse<Void> sendPictureEvent() {

        openviduService.sendPictureEvent();

        return ApiResponse.success(HttpStatus.OK);
    }

}
