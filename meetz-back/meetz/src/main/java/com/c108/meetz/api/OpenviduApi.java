package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.service.OpenviduService;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

//@CrossOrigin(origins = "*")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class OpenviduApi {

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

    @PostMapping("/initroom/{meetingId}")
    public ApiResponse<Void> initRoomSession(@PathVariable("meetingId") int meetingId) throws OpenViduJavaClientException, OpenViduHttpException {

        openviduService.initSession(meetingId);

        return ApiResponse.success(HttpStatus.OK);
    }


    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("{sessionId}/connections")
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

    @GetMapping("/all")
    public ResponseEntity<String> getAllSessions() {

        List<Session> activeSessions = openvidu.getActiveSessions();

        StringBuilder sb = new StringBuilder();
        for (Session session : activeSessions) {
            sb.append(session.getSessionId()).append("\n");
        }

        return new ResponseEntity<>(sb.toString(), HttpStatus.OK);
    }

    @GetMapping("/all/{meetingId}")
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


}
