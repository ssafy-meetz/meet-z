package com.c108.meetz.dto.response;

import com.c108.meetz.domain.ReportReason;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportResponseDto {
    private Long reportId;
    private int meetingId;
    private int userId;
    private ReportReason reason;
    private String filePath;
}
