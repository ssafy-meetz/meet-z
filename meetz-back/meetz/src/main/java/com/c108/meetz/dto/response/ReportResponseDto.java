package com.c108.meetz.dto.response;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.c108.meetz.domain.User;
import lombok.Data;

@Data
public class ReportResponseDto {
    private int meetingId;
    private String starEmail;
    private int fanId;
    private boolean isReported;
    private boolean isProfanity;
    private String filePath;

    public Report toEntity(Meeting meeting, User star, User fan) {
        Report report = new Report();
        report.setMeeting(meeting);
        report.setStar(star);
        report.setFan(fan);
        report.setReported(isReported);
        report.setProfanity(isProfanity);
        report.setFilePath(null);
        return report;
    }

}
