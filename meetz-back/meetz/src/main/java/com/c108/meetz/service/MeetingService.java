package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.FanSaveDto;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.*;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.c108.meetz.domain.Role.FAN;
import static com.c108.meetz.domain.Role.STAR;

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
        Optional<Manager> manager = managerRepository.findByEmail(SecurityUtil.getCurrentUserEmail());
        if (manager.isEmpty()) {
            throw new NotFoundException("Manager not found");
        }
        Meeting meeting = meetingSaveRequestDto.toMeeting(manager.get());
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
        String email = SecurityUtil.getCurrentUserEmail();
        int managerId = managerRepository.findByEmail(email).get().getManagerId();
        if(blackListRepository.existsByNameAndEmailAndPhoneAndManager_ManagerId(fanSaveDto.name(), fanSaveDto.email(), fanSaveDto.phone(), managerId)){
            throw new BadRequestException("블랙리스트입니다.");
        }
    }

    public MeetingDetailResponseDto getMeetingDetails(int meetingId) {
        // 주어진 meetingId로 미팅을 조회
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new NotFoundException("Meeting not found"));
        Optional<Manager> manager = managerRepository.findByEmail(SecurityUtil.getCurrentUserEmail());
        if(meeting.getManager() != manager.get()){
            throw new UnauthorizedException("접근 권한이 없습니다.");
        }
        // 미팅 번호에 따라 팬과 스타 리스트를 조회
        List<User> stars = userRepository.findByMeeting_MeetingIdAndRole(meetingId, STAR);
        List<User> fans = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN);

        // 팬 리스트와 스타 리스트를 DTO로 변환
        List<StarResponseDto> starList = stars.stream()
                .map(star -> new StarResponseDto(star.getUserId(), star.getName(), star.getEmail(), star.getPassword()))
                .collect(Collectors.toList());

        List<FanResponseDto> fanList = fans.stream()
                .map(fan -> new FanResponseDto(fan.getUserId(), fan.getName(), fan.getEmail(), fan.getPhone()))
                .collect(Collectors.toList());
        return MeetingDetailResponseDto.of(meeting, starList, fanList);

    }

    public MeetingSaveResponseDto updateMeeting(int meetingId, MeetingSaveRequestDto meetingSaveRequestDto) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new NotFoundException("Meeting not found"));
        Optional<Manager> manager = managerRepository.findByEmail(SecurityUtil.getCurrentUserEmail());
        if(meeting.getManager() != manager.get()){
            throw new UnauthorizedException("접근 권한이 없습니다.");
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

    public CompletedMeetingListResponseDto getCompletedMeetings() {
        String email = SecurityUtil.getCurrentUserEmail();
        int managerId = managerRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Manager not found")).getManagerId();
        LocalDateTime currentTime = LocalDateTime.now();

        List<Meeting> completedMeetings = meetingRepository.findCompletedMeetingsByManagerId(managerId, currentTime);

        List<CompletedMeetingResponseDto> meetingList = completedMeetings.stream()
                .map(meeting -> {
                    int fanCount = userRepository.findByMeeting_MeetingIdAndRole(meeting.getMeetingId(), Role.FAN).size();
                    return new CompletedMeetingResponseDto(
                            meeting.getMeetingId(),
                            meeting.getMeetingName(),
                            meeting.getMeetingStart(),
                            meeting.getMeetingEnd(),
                            fanCount
                    );
                }).collect(Collectors.toList());

        return new CompletedMeetingListResponseDto(meetingList);
    }
}
