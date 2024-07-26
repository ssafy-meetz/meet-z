package com.c108.meetz.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class MeetingRequestDto {

    @NotBlank(message = "미팅 이름은 필수로 입력해야 합니다.")
    private String meeting_name;

    @NotBlank(message = "미팅 시작 시간은 필수로 입력해야 합니다.")
    private Timestamp meeting_start;

    @NotBlank(message = "미팅 시간은 필수로 입력해야 합니다.")
    private int meeting_duration;

    @NotBlank
    private Timestamp meeting_end;

    @NotBlank(message = "쉬는 시간은 필수로 입력해야 합니다.")
    private int term;

    private List<StarDTO> starList;
    private List<FanDTO> fanList;

    @Getter
    @Setter
    public static class StarDTO {
        private String name;
    }

    @Getter
    @Setter
    public static class FanDTO {
        private String name;
        private String email;
        private String phone;
    }
}
