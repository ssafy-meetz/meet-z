package com.c108.meetz.service;

import com.c108.meetz.domain.ChatRoom;
import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.FanSaveDto;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.*;
import com.c108.meetz.dto.response.StarListResponseDto.StarList;
import com.c108.meetz.exception.*;
import com.c108.meetz.repository.*;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.c108.meetz.domain.Role.FAN;
import static com.c108.meetz.domain.Role.STAR;
import static com.c108.meetz.dto.response.MeetingListResponseDto.*;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final ManagerRepository managerRepository;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final BlackListRepository blackListRepository;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("xls", "xlsx");
    private static final List<String> EXPECTED_HEADERS = List.of("No", "Name", "Email", "Phone(-제외)");

    public MeetingSaveResponseDto saveMeeting(MeetingSaveRequestDto meetingSaveRequestDto) {
        if(!SecurityUtil.getCurrentUserRole().equals("MANAGER")){
            throw new UnauthorizedException("접근 권한이 없습니다.");
        }
        Manager manager = getManager();
        Meeting meeting = meetingSaveRequestDto.toMeeting(manager);
        meeting.setMeetingEnd(calculateMeetingEnd(meetingSaveRequestDto));
        meetingRepository.save(meeting);

        List<User> stars = meetingSaveRequestDto.getStarList().stream()
                .map(starSaveDto -> starSaveDto.toUser(meeting))
                .collect(Collectors.toList());
        userRepository.saveAll(stars);

        List<User> fans = meetingSaveRequestDto.getFanList().stream()
                .map(fanSaveDto -> fanSaveDto.toUser(meeting))
                .collect(Collectors.toList());
        userRepository.saveAll(fans);
        ChatRoom chatRoom = ChatRoom.builder()
                .meeting(meeting)
                .build();
        chatRoomRepository.save(chatRoom); //채팅방 함께 생성
        return new MeetingSaveResponseDto(meeting.getMeetingId());
    }

    private LocalDateTime calculateMeetingEnd(MeetingSaveRequestDto meeting) {
        int lastFanMeetingTime = (meeting.getMeetingDuration() + meeting.getTerm()) * meeting.getStarList().size() - meeting.getTerm(); //마지막 팬이 스타를 만나는 총 시간
        int totalFanMeetingTime = lastFanMeetingTime + (meeting.getMeetingDuration() + meeting.getTerm()) * (meeting.getFanList().size()-1);
        return meeting.getMeetingStart().plusSeconds(totalFanMeetingTime);
    }

    public ExcelResponseDto readExcelFile(MultipartFile file) {
        if(!isExcelFile(file)) throw new ForbiddenException("올바른 파일이 아닙니다.");
        String email = SecurityUtil.getCurrentUserEmail();
        int managerId = managerRepository.findByEmail(email).get().getManagerId();
        try {
            List<FanSaveDto> dtos = parseExcel(file);
            List<FanSaveDto> blackList = new ArrayList<>();
            List<FanSaveDto> notBlackList = new ArrayList<>();
            for (FanSaveDto dto : dtos) {
                if (blackListRepository.existsByNameAndPhoneAndManager_ManagerId(dto.name(), dto.phone(), managerId)) {
                    blackList.add(dto);
                } else {
                    notBlackList.add(dto);
                }
            }
            return new ExcelResponseDto(
                    blackList.isEmpty() ? null : blackList,
                    notBlackList.isEmpty() ? null : notBlackList,
                    notBlackList.size()
            );
        }catch (BadRequestException e){
            throw e;
        }catch(Exception e){
            throw new ForbiddenException("올바른 파일이 아닙니다.");
        }
    }
    private boolean isExcelFile(MultipartFile file) {
        String extension = getFileExtension(file.getOriginalFilename());
        return ALLOWED_EXTENSIONS.contains(extension);
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }

    private List<FanSaveDto> parseExcel(MultipartFile file) throws Exception {
        List<FanSaveDto> result = new ArrayList<>();
        boolean hasData = false; //데이터가 있는 지 확인하기 위한 플래그
        try (InputStream is = file.getInputStream(); Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);
            if(!isValidHeader(headerRow)){
                throw new ForbiddenException("올바른 파일이 아닙니다.");
            }
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;
                String name = getCellValue(row.getCell(1));
                String email = getCellValue(row.getCell(2));
                String phone = getCellValue(row.getCell(3));
                if (!name.isEmpty() || !email.isEmpty() || !phone.isEmpty()) {
                    hasData = true;
                    FanSaveDto dto = new FanSaveDto(name, email, phone);
                    result.add(dto);
                }
            }
        }
        if(!hasData) throw new BadRequestException("명단이 비었습니다.");
        return result;
    }
    private boolean isValidHeader(Row headerRow){
        if(headerRow == null) return false;
        for(int i=0; i< EXPECTED_HEADERS.size(); i++){
            Cell cell = headerRow.getCell(i);
            if(cell == null || !EXPECTED_HEADERS.get(i).equals(cell.getStringCellValue())){
                return false;
            }
        }
        return true;
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            default:
                return "";
        }
    }

    public void checkBlackList(FanSaveDto fanSaveDto) {
        Manager manager = getManager();
        if(blackListRepository.existsByNameAndPhoneAndManager_ManagerId(fanSaveDto.name(), fanSaveDto.phone(), manager.getManagerId())){
            throw new BadRequestException("블랙리스트입니다.");
        }
    }

    public MeetingDetailResponseDto getMeetingDetails(int meetingId) {
        // 주어진 meetingId로 미팅을 조회
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new NotFoundException("Meeting not found"));
        Manager manager = getManager();
        if(meeting.getManager().getManagerId() != manager.getManagerId()){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        // 미팅 번호에 따라 팬과 스타 리스트를 조회
        // 팬 리스트와 스타 리스트를 DTO로 변환
        List<StarInfo> starList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, STAR).stream()
                .map(StarInfo::from)
                .toList();

        List<FanInfo> fanList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN).stream()
                .map(FanInfo::from)
                .toList();
        ChatRoom chatRoom = chatRoomRepository.findByMeeting_MeetingId(meeting.getMeetingId()).orElseThrow(()-> new NotFoundException("chatRoom not found"));
        return MeetingDetailResponseDto.of(meeting, chatRoom.getChatRoomId(), starList, fanList);

    }

    public MeetingSaveResponseDto updateMeeting(int meetingId, MeetingSaveRequestDto meetingSaveRequestDto) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new NotFoundException("Meeting not found"));
        Manager manager = getManager();
        if(meeting.getManager().getManagerId() != manager.getManagerId()){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        meetingSaveRequestDto.updateMeeting(meeting);
        List<User> fans = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN);
        List<FanSaveDto> fanSaveDtoList = fans.stream()
                .map(fan -> new FanSaveDto(fan.getName(), fan.getOriginEmail(), fan.getPhone()))
                .collect(Collectors.toList());
        meetingSaveRequestDto.setFanList(fanSaveDtoList);
        meeting.setMeetingEnd(calculateMeetingEnd(meetingSaveRequestDto));
        meetingRepository.save(meeting);

        userRepository.deleteAll(userRepository.findByMeeting_MeetingIdAndRole(meetingId, STAR));

        List<User> stars = meetingSaveRequestDto.getStarList().stream()
                .map(starSaveDto -> starSaveDto.toUser(meeting))
                .collect(Collectors.toList());
        userRepository.saveAll(stars);

        return new MeetingSaveResponseDto(meeting.getMeetingId());

    }

    public MeetingListResponseDto getMeetingList(boolean flag){
        Manager manager = getManager();
        LocalDateTime currentTime = LocalDateTime.now();
        List<MeetingList> meetings = new ArrayList<>();
        if (flag) { //flag==true 이면 완료된 미팅 찾기
            meetings = meetingRepository.findCompletedMeetingsByManagerId(manager.getManagerId(), currentTime).stream()
                    .map(meeting -> {
                        int cnt = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), FAN).size();
                        return MeetingList.of(meeting, cnt, flag);
                    })
                    .sorted(Comparator.comparing(MeetingList::getMeetingEnd).reversed()) // MeetingList에서 meetingEnd를 기준으로 내림차순 정렬
                    .collect(Collectors.toList());
        } else { //flag == false 이면 미완료 미팅 찾기
            meetings = meetingRepository.findIncompleteMeetingsByManagerId(manager.getManagerId(), currentTime).stream()
                    .map(meeting -> {
                        int cnt = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), FAN).size();
                        return MeetingList.of(meeting, cnt, flag);
                    })
                    .collect(Collectors.toList());
        }
        Map<String, Map<String, List<MeetingList>>> month = meetings.stream()
                .collect(Collectors.groupingBy(
                        meeting -> meeting.getMeetingStart().format(DateTimeFormatter.ofPattern("MM")),
                        LinkedHashMap::new, // 월 순서 유지
                        Collectors.groupingBy(
                                meeting -> meeting.getMeetingStart().format(DateTimeFormatter.ofPattern("dd")),
                                LinkedHashMap::new, // 일 순서 유지
                                Collectors.toList()
                        )
                ));


        return MeetingListResponseDto.from(manager.getCompany(), month);
    }

    //DTO 내부클래스를 사용하는 방법
    public StarListResponseDto getStarList(int meetingId) {
        Manager manager = getManager();
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new BadRequestException("Meeting not found"));

        if (meeting.getManager().getManagerId() != manager.getManagerId()) {
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        List<StarList> starList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, STAR).stream()
                .map(StarList::from)
                .toList();

        return StarListResponseDto.from(starList);
    }

    //DTO를 다 쪼개서 쓰는 방법
    public FanListResponseDto getFanList(int meetingId) {
        Manager manager = getManager();
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new BadRequestException("Meeting not found"));

        if (meeting.getManager().getManagerId() != manager.getManagerId()) {
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        List<FanInfo> fanList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN).stream()
                .map(FanInfo::from)
                .toList();

        return new FanListResponseDto(fanList);

    }

    public void deleteMeeting(int meetingId) {
        Manager manager = getManager();
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new BadRequestException("Meeting not found"));

        if (meeting.getManager().getManagerId() != manager.getManagerId()) {
            throw new BadRequestException("접근 권한이 없습니다.");
        }

        meetingRepository.delete(meeting);
    }

    public MeetingInfoFanResponseDto getMeetingInfo() {
        if(!SecurityUtil.getCurrentUserRole().equals("FAN")){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        User currentUser = getUser();
        Meeting meeting = meetingRepository.findById(currentUser.getMeeting().getMeetingId()).orElseThrow(() ->
                new NotFoundException("Meeting not found"));
        List<User> fanList = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), FAN);
        int userPosition = 0;
        for(int i = 0; i<fanList.size(); i++){
            if(fanList.get(i).getUserId()==currentUser.getUserId()){
                userPosition = i;
                break;
            }
        }
        List<StarList> starList = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), STAR).stream()
                .map(user-> {
                    StarList star = StarList.from(user);
                    star.setEmail(null);
                    star.setPassword(null);
                    return star;
                })
                .toList();
        int waitingTime = (userPosition) * (meeting.getMeetingDuration() + meeting.getTerm());
        ChatRoom chatRoom = chatRoomRepository.findByMeeting_MeetingId(meeting.getMeetingId()).orElseThrow(()-> new NotFoundException("chatRoom not found"));
        return MeetingInfoFanResponseDto.of(meeting, starList, userPosition, waitingTime, chatRoom.getChatRoomId(), currentUser.getNickname());
    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }

    private User getUser(){
        String email = SecurityUtil.getCurrentUserEmail();
        return userRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException("user not found"));
    }

    public void updateNickname(String nickname){
        User user = getUser();
        userRepository.updateNickname(user.getUserId(), nickname);
    }

    public MeetingInfoStarResponseDto getMeetingInfoStar() {
        if(!SecurityUtil.getCurrentUserRole().equals("STAR")){
            throw new BadRequestException("접근 권한이 없습니다.");
        }
        User user = getUser();
        Meeting meeting = meetingRepository.findById(user.getMeeting().getMeetingId()).orElseThrow(() ->
                new NotFoundException("Meeting not found"));
        List<FanNameInfo> fanList = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), FAN).stream()
                .map(FanNameInfo::from)
                .toList();
        return MeetingInfoStarResponseDto.of(meeting, fanList, user.getName());

    }
}