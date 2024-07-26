package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.MeetingSaveResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.service.MeetingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
