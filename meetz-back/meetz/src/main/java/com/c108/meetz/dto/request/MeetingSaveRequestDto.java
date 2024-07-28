package com.c108.meetz.dto.request;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MeetingSaveRequestDto {
    @NotBlank(message = "미팅 이름은 필수로 입력해야 합니다.")
    private String meetingName;

    @NotNull(message = "미팅 시작 시간은 필수로 입력해야 합니다.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime meetingStart;

    @NotNull(message = "미팅 시간은 필수로 입력해야 합니다.")
    private int meetingDuration;

    @NotNull(message = "쉬는 시간은 필수로 입력해야 합니다.")
    private int term;

    private List<StarSaveDto> starList;
    private List<FanSaveDto> fanList;
    public Meeting toMeeting(Manager manager){
        return Meeting.builder()
                .manager(manager)
                .meetingName(this.meetingName)
                .meetingStart(this.meetingStart)
                .meetingDuration(this.meetingDuration)
                .term(this.term)
                .build();
    }

    public void updateMeeting(Meeting meeting){
        meeting.setMeetingName(this.meetingName);
        meeting.setMeetingStart(this.meetingStart);
        meeting.setMeetingDuration(this.meetingDuration);
        meeting.setTerm(this.term);
    }

}