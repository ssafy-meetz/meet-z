package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.ExcelResponseDto;
import com.c108.meetz.dto.response.MeetingSaveResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.service.MeetingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/meeting")
public class MeetingApi {

    private final MeetingService meetingService;

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
}
