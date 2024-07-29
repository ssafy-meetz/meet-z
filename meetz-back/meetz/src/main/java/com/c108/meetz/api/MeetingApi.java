package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.FanSaveDto;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.*;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.service.MailService;
import com.c108.meetz.service.MeetingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping("")
    public ApiResponse<MeetingSaveResponseDto> createMeeting(@Valid @RequestBody MeetingSaveRequestDto meetingSaveRequestDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BadRequestException("올바른 형식이 아닙니다.");
        }
        MeetingSaveResponseDto response = meetingService.saveMeeting(meetingSaveRequestDto);
        return ApiResponse.success(OK, response);
    }

    @PostMapping("/file")
    public ApiResponse<ExcelResponseDto> readExcelFile(@RequestParam("file") MultipartFile file){
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
    public ApiResponse<CompletedMeetingListResponseDto> getCompletedMeetings() {
        CompletedMeetingListResponseDto response = meetingService.getCompletedMeetings();
        return ApiResponse.success(OK, response);
    }

    @GetMapping("/incomplete")
    public ApiResponse<IncompleteMeetingListResponseDto> getIncompleteMeetings() {
        IncompleteMeetingListResponseDto response = meetingService.getIncompleteMeetings();
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
}
