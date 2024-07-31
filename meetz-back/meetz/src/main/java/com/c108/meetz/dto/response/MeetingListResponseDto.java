package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
public class MeetingListResponseDto {
    private Map<String, List<MeetingList>> month;

    private MeetingListResponseDto(Map<String, List<MeetingList>> month) {
        this.month = month;
    }

    public static MeetingListResponseDto from(Map<String, List<MeetingList>> month){
        return new MeetingListResponseDto(month);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class MeetingList{

        private int meetingId;
        private String meetingName;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime meetingStart;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        private LocalDateTime meetingEnd;
        private int cnt;

        public static MeetingList of(Meeting meeting, int cnt, boolean flag){
            MeetingList meetingList = new MeetingList();
            meetingList.setMeetingId(meeting.getMeetingId());
            meetingList.setMeetingName(meeting.getMeetingName());
            meetingList.setMeetingStart(meeting.getMeetingStart());
            if (flag) {
                meetingList.setMeetingEnd(meeting.getMeetingEnd());
            } else {
                meetingList.setMeetingEnd(LocalDateTime.of(1, 1, 1, 0, 0));
            }
            meetingList.setCnt(cnt);
            return meetingList;
        }

    }




}
