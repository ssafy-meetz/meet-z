package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.FanSaveDto;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.request.WarningRequestDto;
import com.c108.meetz.dto.response.*;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/meeting")
public class MeetingApi {

    private final MeetingService meetingService;
    private final MailService mailService;
    private final AudioProcessingService audioProcessingService;
    private final ReportService reportService;
    private final WarningService warningService;

    @PostMapping("")
    public ApiResponse<MeetingSaveResponseDto> createMeeting(@Valid @RequestBody MeetingSaveRequestDto meetingSaveRequestDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BadRequestException("올바른 형식이 아닙니다.");
        }
        MeetingSaveResponseDto response = meetingService.saveMeeting(meetingSaveRequestDto);
        return ApiResponse.success(OK, response);
    }

    @PostMapping(value = "/file", consumes = "multipart/form-data")
    public ApiResponse<ExcelResponseDto> readExcelFile(@RequestPart("file") MultipartFile file){
        ExcelResponseDto response = meetingService.readExcelFile(file);
        return ApiResponse.success(OK, response);
    }

    @PostMapping("/blacklist")
    public ApiResponse<Void> checkBlackList(@RequestBody FanSaveDto fanSaveDto) {
        meetingService.checkBlackList(fanSaveDto);
        return ApiResponse.success(OK);
    }

    @GetMapping("/{meetingId}")
    public ApiResponse<MeetingDetailResponseDto> getMeetingDetails(@PathVariable int meetingId) {
        MeetingDetailResponseDto response = meetingService.getMeetingDetails(meetingId);
        return ApiResponse.success(OK, response);
    }
    
    @GetMapping("/{meetingId}/sendmail")
    public ApiResponse<Void> sendMailToFan(@PathVariable int meetingId){
        mailService.sendMailToFan(meetingId);
        return ApiResponse.success(OK);
    }

    @GetMapping("/completed")
    public ApiResponse<MeetingListResponseDto> getCompletedMeetings() {
        MeetingListResponseDto response = meetingService.getMeetingList(true);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/incomplete")
    public ApiResponse<MeetingListResponseDto> getIncompleteMeetings() {
        MeetingListResponseDto response = meetingService.getMeetingList(false);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/{meetingId}/star")
    public ApiResponse<StarListResponseDto> getStarList(@PathVariable int meetingId) {
        StarListResponseDto response = meetingService.getStarList(meetingId);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/{meetingId}/fan")
    public ApiResponse<FanListResponseDto> getFanList(@PathVariable int meetingId) {
        FanListResponseDto response = meetingService.getFanList(meetingId);
        return ApiResponse.success(OK, response);
    }

    @PutMapping("/{meetingId}")
    public ApiResponse<MeetingSaveResponseDto> updateMeeting(@PathVariable int meetingId, @RequestBody MeetingSaveRequestDto meetingSaveRequestDto) {
        MeetingSaveResponseDto response = meetingService.updateMeeting(meetingId, meetingSaveRequestDto);
        return ApiResponse.success(OK, response);
    }

    @DeleteMapping("/{meetingId}")
    public ApiResponse<Void> deleteMeeting(@PathVariable int meetingId) {
        meetingService.deleteMeeting(meetingId);
        return ApiResponse.success(OK);
    }

    @GetMapping("/info")
    public ApiResponse<MeetingInfoFanResponseDto> getMeetingInfo() {
        MeetingInfoFanResponseDto response = meetingService.getMeetingInfo();
        return ApiResponse.success(OK, response);
    }

    @PostMapping(value = "/check-profanity", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<TranscriptionResponseDto> checkProfanity(@RequestPart("file") MultipartFile file, @RequestParam("email") String email) {
        audioProcessingService.processAudioAndHandleReport(file, email); // 접속한 팬 입장에서 데이터 전송, RequestParam String email은 스타 이메일
        return ApiResponse.success(OK);
    }

    @PutMapping("/nickname")
    public ApiResponse<Void> updateNickname(@RequestParam(value="nickname") String nickname){
        meetingService.updateNickname(nickname);
        return ApiResponse.success(OK);
    }

    @GetMapping("/info/star")
    public ApiResponse<MeetingInfoStarResponseDto> getMeetingInfoStar() {
        MeetingInfoStarResponseDto response = meetingService.getMeetingInfoStar();
        return ApiResponse.success(OK, response);
    }

    @PostMapping(value = "/image/{frameId}", consumes = "multipart/form-data")
    public ApiResponse<Void> uploadImage(@RequestPart("image") List<MultipartFile> files, @PathVariable int frameId) {
        mailService.sendImageToFan(files, frameId);
        return ApiResponse.success(OK);
    }

    // 신고 생성 엔드포인트
    @PostMapping("/report/{userId}")
    public ApiResponse<Void> reportUser(@PathVariable int userId) {
        reportService.saveReport(userId);
        return ApiResponse.success(OK);
    }

    // 신고 취소 엔드포인트
    @DeleteMapping("/report/{userId}")
    public ApiResponse<Void> cancelReport(@PathVariable int userId) {
        reportService.cancelReport(userId);
        return ApiResponse.success(OK);
    }

    @GetMapping("/{meetingId}/report")
    public ApiResponse<ReportsListResponseDto> getReportList(@PathVariable int meetingId) {
        ReportsListResponseDto response = reportService.getReportList(meetingId);
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/{meetingId}/report/{reportId}")
    public ApiResponse<ReportDetailResponseDto> getReportDetail(@PathVariable int meetingId, @PathVariable int reportId) {
        ReportDetailResponseDto response = reportService.getReportDetail(meetingId, reportId);
        return ApiResponse.success(OK, response);
    }

    @PostMapping("/warning")
    public ApiResponse<Void> saveWarning(@RequestBody WarningRequestDto warningRequestDto) {
        warningService.saveWarning(warningRequestDto.userId(), warningRequestDto.reason());
        return ApiResponse.success(OK);
    }
}