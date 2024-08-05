package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.dto.response.StarListResponseDto.StarList;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;


public record MeetingInfoFanResponseDto(int meetingId, String meetingName, @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime meetingStart, int meetingDuration, int term, int userPosition, int chatRoomId, String nickname, List<StarList> starList) {
    public static MeetingInfoFanResponseDto of(Meeting meeting, List<StarList> starList, int userPosition, int chatRoomId, String nickname) {
        return new MeetingInfoFanResponseDto(
                meeting.getMeetingId(),
                meeting.getMeetingName(),
                meeting.getMeetingStart(),
                meeting.getMeetingDuration(),
                meeting.getTerm(),
                userPosition,
                chatRoomId,
                nickname,
                starList
        );
    }
}
