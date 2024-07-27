package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingSaveRequestDto(
        @NotNull int managerId,
        @NotBlank(message = "미팅 이름은 필수로 입력해야 합니다.") String meetingName,
        @NotNull(message = "미팅 시작 시간은 필수로 입력해야 합니다.") @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart,
        @NotNull(message = "미팅 시간은 필수로 입력해야 합니다.") int meetingDuration,
        @NotNull(message = "쉬는 시간은 필수로 입력해야 합니다.") int term,
        List<StarSaveDto> starList,
        List<FanSaveDto> fanList
) {
    public Meeting toMeeting(Manager manager){
        return Meeting.builder()
                .manager(manager)
                .meetingName(this.meetingName)
                .meetingStart(this.meetingStart)
                .meetingDuration(this.meetingDuration)
                .term(this.term)
                .build();
    }
}