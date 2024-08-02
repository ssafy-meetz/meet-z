package com.c108.meetz.api;

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

    private Map<String, List<Session>> meetingrooms = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
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


        //방관리를 위해 넣어준거
        if (session != null) { //세션 생성 됐으면
            String str = session.getSessionId();
            String roomPoint = str.split("0seper0")[0]; //방 이름별로 분리하자.
            if (!meetingrooms.containsKey(roomPoint)) { //미팅룸이 없으면 List 등록
                meetingrooms.put(roomPoint, new ArrayList<>());
                meetingrooms.get(roomPoint).add(session);
            } else { //미팅룸이 있으면
                meetingrooms.get(roomPoint).add(session);
            }
        }

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
    @GetMapping("/all/{roomPoint}")
    public ResponseEntity<String> getRoomSessions(@PathVariable("roomPoint") String roomPoint) {

        List<Session> activeSessions = meetingrooms.get(roomPoint);

        StringBuilder sb = new StringBuilder();
        if (activeSessions != null) {
            log.info("size = {}", activeSessions.size());
            for (Session session : activeSessions) {
                sb.append(session.getSessionId()).append("\n");
                sb.append("------------").append("\n");
            }
        }
        return new ResponseEntity<>(sb.toString(), HttpStatus.OK);
    }


}
