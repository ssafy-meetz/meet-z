package com.c108.meetz.service;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Role;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.FanSseResponseDto;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
@RequiredArgsConstructor
public class OpenviduService {

    //내부에서 관리되는 클래스니 따로 getter, setter는 만들지 않겠다. 팬 정보를 담고 있는 클래스
    static class FanInfo {
        String email; //팬의 이메일
        SseEmitter emitter; //팬의 에미터
        int curStarIdx;

        public FanInfo(String email) {
            this.emitter = null;
            this.email = email;
            this.curStarIdx = 0;
        }
    }

    static class StarInfo {
        String name;
        String email;
        SseEmitter emitter;
        Session session;

        public StarInfo(String name, String email, Session session) {
            this.name = name;
            this.session = session;
        }
    }


    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    //미팅룸에 있는 스타 정보들을 담는 Map//
    private static final Map<Integer, List<Session>> meetingRooms = new ConcurrentHashMap<>(); //미팅방 스타의 세션 정보를 담는 맵
    private static final Map<Integer, List<StarInfo>> meetingRoomsV2 = new ConcurrentHashMap<>(); //미팅방 스타의 세션 정보를 담는 맵
    //미팅방 정보
    private static final Map<Integer, Meeting> meetingRoomInfos = new ConcurrentHashMap<>();//미팅방 정보
    //FanSse정보
    private static final Map<Integer, List<FanInfo>> FanEmitterMap = new ConcurrentHashMap<>(); //클라이언트 sse 정보 저장 맵

    private static final Map<Integer, Integer> meetingPhases = new ConcurrentHashMap<>(); //미팅 진행 단계를 나타내는 맵



    //Repository
    private final UserRepository userRepository;
    private final MeetingRepository meetingRepository;

    //Schedule
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1); //스케줄러
    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    //emiiter 설정 상수
    private static final long TIMEOUT = 24 * 60 * 60 * 1000; //1000ms = 1s
    private static final long RECONNECTION_TIMEOUT = 1000L;

    ////
    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    //test용 메서드
    public String getEmail() {
        String a = "";

        List<User> byMeetingMeetingIdAndRole = userRepository.findByMeeting_MeetingIdAndRole(1, Role.FAN);

        if (byMeetingMeetingIdAndRole.size() > 0) {
            a = byMeetingMeetingIdAndRole.get(0).getEmail();
        }

        return a;
    }
    //====================================스케쥴러================================//
    //스케줄러 테스트
    //cron(초 분 시 일 월 요일 (년))
    // * : 모든 값, /: 증분 값(0/15, 0부터 시작해 15마다), -: 범위
//    @Scheduled(cron = "1 0/5 * * * ?") //5분마다 실행
//    public void scheduleTaskTest() {
//        log.info("스케쥴 함수 실행: " + LocalDateTime.now().format(dateFormat));
//        //1. 미팅 시작 시간 30분 전에 방에 대한 모든 세션 생성(미팅 테이블에서 시작 시간 범위를 (현재 시간 + 30 == 미팅 시작 시간)인거 불러오기)
//        //2. 만약 미팅 세션이 안만들어진 방이라면 만들기
//        //3. 미팅 시작시간이 된 방들에 대해선 현재 접속중인 사람들에게 방 이동 명령을 하게 만들어주는 함수 실행
//    }

    //미팅방 자동화 시스템 핵심 함수 (미팅 시작 시간이 되면 자동으로 실행된다.)
    public void automateMeetingRoom(int meetingId) {
        //미팅 자동화 알고리즘
        //1. 방에 있는 스타 세션과 팬의 emitter 불러오기
        List<Session> starSessions = meetingRooms.get(meetingId);
        List<FanInfo> fans = FanEmitterMap.get(meetingId);

        if (starSessions == null || fans == null) {
            log.error("스타 세션 또는 팬 목록이 비어있습니다.");
        }

        int totalPhases = fans.size() + starSessions.size() - 1;
        int currentPhase = getCurrentPhase(meetingId); //현재 진행중인 phase를 반환

        if (currentPhase >= totalPhases) {
            log.info("{}번 미팅이 종료되었습니다.", meetingId);
            endMeeting(meetingId);
            return;
        }
        log.info("==================== phase: {} ====================", currentPhase);
        //팬들 범위 지정
        int startFan = Math.max(0, currentPhase - starSessions.size() + 1);
        int endFan = Math.min(currentPhase, fans.size() - 1);
        for (int fanIdx = startFan; fanIdx <= endFan; fanIdx++) {
            FanInfo fan = fans.get(fanIdx);
            int starIdx = currentPhase - fanIdx;

            //스타의 인덱스가 범위 안이면
            if (starIdx < starSessions.size()) {
                fan.curStarIdx = starIdx;//팬의 현재 스타 인덱스 갱신
                Session nextStarSession = starSessions.get(starIdx); //다음 스타의 세션 얻기

                try {
                    //팬에게 방 접속 정보를 sse로 보내기.
                    sendEventToFan(meetingId, fan.email, starIdx);
                    log.info("팬 {}가 {}번 방으로 이동합니다.", fan.email, starIdx);
                } catch (Exception e) {
                    log.error("에러");
                }

            }

            updateCurrentPhase(meetingId, currentPhase + 1);
            scheduleNextAutomation(meetingId);
        }

        //모든 팬들에게 방 이동 정보를 줬음.

        //이제 페이즈++를 해주고 한 페이즈가 끝난 후에 다시 위의 함수를 실행하도록 한다.

    }

    private int getCurrentPhase(int meetingId) {
        return meetingPhases.getOrDefault(meetingId, 0);
    }

    private void updateCurrentPhase(int meetingId, int newPhase) {
        meetingPhases.put(meetingId, newPhase);
    }

    private void scheduleNextAutomation(int meetingId) {
        scheduler.schedule(() -> automateMeetingRoom(meetingId), 5, TimeUnit.SECONDS);
    }

    private void endMeeting(int meetingId) {
        meetingPhases.remove(meetingId);
        meetingRooms.remove(meetingId);
        FanEmitterMap.remove(meetingId);
    }

    public void registMeetingInfo(int meetingId) {
        Meeting meetingInfo = meetingRepository.findById(meetingId).orElseThrow(NotFoundException::new);
        log.info("meetingInfo: {}", meetingInfo);
        meetingRoomInfos.put(meetingId, meetingInfo);
        log.info("{}번 방 정보 등록 완료", meetingId);
    }

    public void deleteMeetingInfo(int meetingId) {
        meetingRoomInfos.remove(meetingId);
    }

    //============================OpenViduService================================//

    //방의 모든 세션(스타의 방) 생성, 세션Id는 스타의 이메일
    public boolean initSession(Integer meetingId) throws OpenViduJavaClientException, OpenViduHttpException {

        //roomId를 통해 스타의 정보를 불러온다.
        List<User> users = userRepository.findByMeeting_MeetingIdAndRole(meetingId, Role.STAR);

        //못불러왔을 때
        if (users == null) {
            return false;
        }

        log.info("userSize = {}", users.size());

        if (users.isEmpty()) {
            //세션 생성 실패
            log.info("세션 생성 실패(스타가 없음)");
            return false;
        }

        //리스트 생성
        meetingRooms.put(meetingId, Collections.synchronizedList(new ArrayList<>()));

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

    //방의 모든 세션(스타의 방) 생성, 세션Id는 스타의 이메일
    public boolean initSessionV2(Integer meetingId) throws OpenViduJavaClientException, OpenViduHttpException {

        //roomId를 통해 스타의 정보를 불러온다.
        List<User> users = userRepository.findByMeeting_MeetingIdAndRole(meetingId, Role.STAR);

        //못불러왔을 때
        if (users == null || users.isEmpty()) {
            //세션 생성 실패
            log.info("세션 생성 실패. 스타 조회에 실패했습니다.");
            return false;
        }

        log.info("userSize = {}", users.size());

        //리스트 생성
        meetingRoomsV2.put(meetingId, Collections.synchronizedList(new ArrayList<>()));

        for (User user : users) {
            //도메인의 앞 부분 가져와 sessionId로 지정
            String sessionId = user.getEmail().split("@")[0];
            //sessionProperties생성
            SessionProperties properties = getSessionProperties(sessionId);
            //sessjion생성
            Session session = openvidu.createSession(properties);
            log.info("sessionId: " + sessionId + ", getSessionId: " + session.getSessionId());

            StarInfo starInfo = new StarInfo(user.getName(), user.getEmail(), session);

            //생성한 세션을 리스트에넣기
            meetingRoomsV2.get(meetingId).add(starInfo);
        }
        log.info("세션 생성 성공 meetingRoomsV2 SIZE: {}", meetingRoomsV2.get(meetingId).size());
        return true;
    }

    //세션의 접근 토큰을 얻는 함수
    public String getToken(int meetingId, int starIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        List<Session> sessions = meetingRooms.get(meetingId);
        if (sessions == null) {
            return null;
        }

        Session session = sessions.get(starIdx);

        // 세션 얻어오기 실패
        if (session == null) {
            return null;
        }

        //프로퍼티 생성
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER) //Publisher는 화면 및 음성 공유 가능
                .data("handsomeChangWoo")//사용자 관련 데이터 전송
                .build();

        //커넥션 생성
        Connection connection = session.createConnection(connectionProperties);

        return connection.getToken();
    }

    public String getTokenV2(int meetingId, int starIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        List<StarInfo> sessions = meetingRoomsV2.get(meetingId);
        if (sessions == null) {
            return null;
        }

        Session session = sessions.get(starIdx).session;

        // 세션 얻어오기 실패
        if (session == null) {
            return null;
        }

        //프로퍼티 생성
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER) //Publisher는 화면 및 음성 공유 가능
                .data("handsomeChangWoo")//사용자 관련 데이터 전송
                .build();

        //커넥션 생성
        Connection connection = session.createConnection(connectionProperties);

        return connection.getToken();
    }

    //미팅방 삭제
    public void deleteMeetingRoom(int meetingId) throws OpenViduJavaClientException, OpenViduHttpException {
        List<Session> sessions = meetingRooms.get(meetingId);

        if (sessions == null) {
            return;
        }

        for (Session session : sessions) {
            if (session != null) {
                session.close();
            }
        }
        meetingRooms.remove(meetingId);
    }
    //미팅방 삭제 V2
    public void deleteMeetingRoomV2(int meetingId) throws OpenViduJavaClientException, OpenViduHttpException {
        List<StarInfo> starInfos = meetingRoomsV2.get(meetingId);

        if (starInfos == null) {
            return;
        }

        for (StarInfo starInfo : starInfos) {
            if (starInfo.session != null) {
                starInfo.session.close();
            }
        }
        meetingRoomsV2.remove(meetingId);
    }



    //기본 sessionProperties 생성 함수
    public SessionProperties getSessionProperties(String sessionId) {
        return new SessionProperties.Builder().customSessionId(sessionId).build();
    }

    //미팅룸의 모든 세션을 구하는 함수
    public List<Session> getMeetingRooms(int meetingId) {
        return meetingRooms.get(meetingId);
    }

    public List<Session> getMeetingRoomsV2(int meetingId) {
        List<StarInfo> starInfos = meetingRoomsV2.get(meetingId);
        List<Session> sessions = Collections.synchronizedList(new ArrayList<>());

        log.info("starInfos.size = {}", starInfos.size());

        for (StarInfo starInfo : starInfos) {
            log.info("session: {}", starInfo.session);
            sessions.add(starInfo.session);
        }
        return sessions;
    }

    //======================================SSE Service======================================//

    //방별 팬 정보를 넣는 함수
    public boolean initFanInfo(int meetingId) {

        //이미 정보가 있다면?
        if (FanEmitterMap.containsKey(meetingId)) {
            return false;
        }

        //리스트 생성(thread safe한걸 넣어야 할지? 고민중인 부분)
        FanEmitterMap.put(meetingId, Collections.synchronizedList(new ArrayList<>()));

        List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);

        //팬의 정보 불러오기(기본적으로 오른차순이니 순서가 보장된다)
        List<User> users = userRepository.findByMeeting_MeetingIdAndRole(meetingId, Role.FAN);

        //유저 정보가 없다면?
        if (users.isEmpty()) {
            log.info("users정보 불러오기 실패.");
            return false;
        }

        log.info("usersSize = {}", users.size());

        //유저정보 입력
        for (User user : users) {
            fanInfos.add(new FanInfo(user.getEmail()));
        }
        return true;
    }

    private User getUser(){
        String email = SecurityUtil.getCurrentUserEmail();
        return userRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException("user not found"));
    }

    //emitter를 만들어서 클라이언트에게 전달
    public SseEmitter subscribFan() {

        User user = getUser();
        String userEmail = null;
        if (user == null) {
            return null;
        }

        int meetingId = user.getMeeting().getMeetingId();

        userEmail = user.getEmail();

        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitterConfig(emitter, userEmail);
        log.info("emitter 생성 및 세팅 완료");

        if (user.getRole() == Role.FAN) { //팬이면
            List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);

            if (fanInfos == null) {
                return null;
            }

            for (FanInfo fanInfo : fanInfos) {
                if (fanInfo.email.equals(userEmail)) {
                    fanInfo.emitter = emitter;
                    log.info("fanInfo에 emitter 등록 완료");
                    break;
                }
            }
        } else {
            List<StarInfo> starInfos = meetingRoomsV2.get(meetingId);

            if (starInfos == null) {
                return null;
            }

            for (StarInfo starInfo : starInfos) {
                if (starInfo.email.equals(userEmail)) {
                    starInfo.emitter = emitter;
                    log.info("meetingRoomV2에 emitter 등록 완료");
                    break;
                }
            }

        }

        return emitter;
    }

    //emitter 세팅
    public void emitterConfig(SseEmitter emitter, String email) {
        emitter.onTimeout(() -> {
            log.info("server sent event timed out : email={}", email);
            emitter.complete();
        });

        //에러 핸들러 등록
        emitter.onError(e -> {
            log.info("server sent event error : email={}, message={}", email, e.getMessage());
            emitter.complete();
        });
    }

    //방의 모든 팬들에게 정보 전달
    public void broadcastFan(int meetingId) throws IOException {

        List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);

        List<Session> sessions = meetingRooms.get(meetingId);

        //일단 임시로 만든 dto
        FanSseResponseDto dto = new FanSseResponseDto(sessions.get(0).getSessionId());

        for (FanInfo fanInfo : fanInfos) {
            fanInfo.emitter.send(dto, MediaType.APPLICATION_JSON);
        }
    }

    //방의 모든 팬들에게 정보 전달
    public void broadcastFanV2(int meetingId) throws IOException {

        List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);

        List<StarInfo> sessions = meetingRoomsV2.get(meetingId);

        //일단 임시로 만든 dto
        FanSseResponseDto dto = new FanSseResponseDto(sessions.get(0).session.getSessionId());

        for (FanInfo fanInfo : fanInfos) {
            fanInfo.emitter.send(dto, MediaType.APPLICATION_JSON);
        }
    }

    //특정 팬에게 정보 전달
    public void sendEventToFan(int meetingId, String email, int starIdx)
            throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        SseEmitter sseEmitter = null;

        List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);
        //스타 방 접근 토큰 얻기
        String token = getToken(meetingId, starIdx);
        //팬의 emitter 얻기
        for (FanInfo fanInfo : fanInfos) {
            if (fanInfo.email.equals(email)) {
                sseEmitter = fanInfo.emitter;
                break;
            }
        }

        if (sseEmitter == null) {
            return;
        }

        //dto 생성//
        FanSseResponseDto dto = new FanSseResponseDto(token);

        Meeting meeting = meetingRoomInfos.get(meetingId);

        if (meeting == null) {
            sseEmitter.send(dto, MediaType.APPLICATION_JSON);
        } else {
            FanSseResponseDto realDto = new FanSseResponseDto(meeting.getMeetingName(), "원빈", token, meeting.getMeetingDuration());
            sseEmitter.send(realDto, MediaType.APPLICATION_JSON);
        }

    }

    public int getRoomSize(int meetingId) {
        return meetingRoomsV2.get(meetingId).size();
    }

    //특정 팬에게 정보 전달
    public void sendEventToFanV2(int meetingId, String email, int starIdx)
            throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        SseEmitter sseEmitter = null;

        List<FanInfo> fanInfos = FanEmitterMap.get(meetingId);
        //스타 방 접근 토큰 얻기
        String token = getTokenV2(meetingId, starIdx);
        //팬의 emitter 얻기
        for (FanInfo fanInfo : fanInfos) {
            if (fanInfo.email.equals(email)) {
                sseEmitter = fanInfo.emitter;
                break;
            }
        }

        if (sseEmitter == null) {
            return;
        }

        //dto 생성
        FanSseResponseDto dto = new FanSseResponseDto(token);

        Meeting meeting = meetingRoomInfos.get(meetingId);

        if (meeting == null) {
            sseEmitter.send(dto, MediaType.APPLICATION_JSON);
        } else {
            FanSseResponseDto realDto = new FanSseResponseDto(meeting.getMeetingName(), "원빈", token, meeting.getMeetingDuration());
            sseEmitter.send(realDto, MediaType.APPLICATION_JSON);
        }

    }

}