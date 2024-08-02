package com.c108.meetz.service;

import com.c108.meetz.domain.Role;
import com.c108.meetz.domain.User;
import com.c108.meetz.repository.UserRepository;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenviduService {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private Map<Integer, List<Session>> meetingRooms;

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        meetingRooms = new ConcurrentHashMap<>();
    }


    //방의 모든 세션(스타의 방) 생성
    //세션Id는 스타의 이메일
    public boolean initSession(Integer meetingId) throws OpenViduJavaClientException, OpenViduHttpException {

        //roomId를 통해 스타의 정보를 불러온다.
        List<User> users = userRepository.findByMeeting_MeetingIdAndRole(meetingId, Role.STAR);

        if (users.isEmpty()) {
            //세션 생성 실패
            log.info("세션 생성 실패(스타가 없음)");
            return false;
        }

        //리스트 생성
        meetingRooms.put(meetingId, new ArrayList<>());

        for (User user : users) {
            //도메인의 앞 부분 가져와 sessionId로 지정
            String sessionId = user.getEmail().split("@")[0];
            //sessionProperties생성
            SessionProperties properties = getSessionProperties(sessionId);
            //sessjion생성
            Session session = openvidu.createSession(properties);
            log.info("sessionId: " + sessionId + ", getSessionId: " + session.getSessionId());
            //생성한 세션을 리스트에넣기
            meetingRooms.get(meetingId).add(session);
        }
        log.info("세션 생성 성공");
        return true;
    }

    //기본 sessionProperties
    public SessionProperties getSessionProperties(String sessionId) {
        return new SessionProperties.Builder().customSessionId(sessionId).build();
    }


    public List<Session> getMeetingRooms(int meetingId) {
        return meetingRooms.get(meetingId);
    }



}
