package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.FanSaveDto;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.*;
import com.c108.meetz.dto.response.StarListResponseDto.StarList;
import com.c108.meetz.exception.*;
import com.c108.meetz.repository.BlackListRepository;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.UserRepository;
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
    private final BlackListRepository blackListRepository;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("xls", "xlsx");

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

        return new MeetingSaveResponseDto(meeting.getMeetingId());
    }

    private LocalDateTime calculateMeetingEnd(MeetingSaveRequestDto meeting) {
        int singleFanMeetingTime = (meeting.getMeetingDuration() + meeting.getTerm()) * meeting.getStarList().size() - meeting.getTerm();
        int totalFanMeetingTime = singleFanMeetingTime * meeting.getFanList().size();
        return meeting.getMeetingStart().plusSeconds(totalFanMeetingTime);
    }

    public ExcelResponseDto readExcelFile(MultipartFile file) {
        if(file.isEmpty()) throw new BadRequestException("파일을 첨부해주세요.");
        if(!isExcelFile(file)) throw new BadRequestException("엑셀파일만 첨부할 수 있습니다.");
        String email = SecurityUtil.getCurrentUserEmail();
        int managerId = managerRepository.findByEmail(email).get().getManagerId();
        try {
            List<FanSaveDto> dtos = parseExcel(file);
            List<FanSaveDto> blackList = new ArrayList<>();
            List<FanSaveDto> notBlackList = new ArrayList<>();
            for(FanSaveDto dto : dtos){
                if(blackListRepository.existsByNameAndEmailAndPhoneAndManager_ManagerId(dto.name(), dto.email(), dto.phone(), managerId)){
                    blackList.add(dto);
                }else{
                    notBlackList.add(dto);
                }
            }
            return new ExcelResponseDto(
                    blackList.isEmpty() ? null : blackList,
                    notBlackList.isEmpty() ? null : notBlackList,
                    notBlackList.size()
            );
        }catch(Exception e){
            throw new InternalServerErrorException();
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
        try (InputStream is = file.getInputStream(); Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;
                String name = getCellValue(row.getCell(1));
                String email = getCellValue(row.getCell(2));
                String phone = getCellValue(row.getCell(3));
                if (name.isEmpty() && email.isEmpty() && phone.isEmpty()) {
                    continue;
                }
                FanSaveDto dto = new FanSaveDto(name, email, phone);
                result.add(dto);
            }
        }
        return result;
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
        if(blackListRepository.existsByNameAndEmailAndPhoneAndManager_ManagerId(fanSaveDto.name(), fanSaveDto.email(), fanSaveDto.phone(), manager.getManagerId())){
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
        List<StarResponseDto> starList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, STAR).stream()
                .map(StarResponseDto::from)
                .toList();

        List<FanResponseDto> fanList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN).stream()
                .map(FanResponseDto::from)
                .toList();

        return MeetingDetailResponseDto.of(meeting, starList, fanList);

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
                .map(fan -> new FanSaveDto(fan.getName(), fan.getEmail(), fan.getPhone()))
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
                        Collectors.groupingBy(
                                meeting -> meeting.getMeetingStart().format(DateTimeFormatter.ofPattern("dd"))
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

        List<FanResponseDto> fanList = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN).stream()
                .map(FanResponseDto::from)
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

        // 추후 채팅방 구현 시 미팅에 속한 사용자와 채팅방 삭제 쿼리 추가 논의 필요
        meetingRepository.delete(meeting);
    }

    private Manager getManager(){
        String email = SecurityUtil.getCurrentUserEmail();
        return managerRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("manager not found"));
    }

}