package com.c108.meetz.dto.response;

import com.c108.meetz.dto.request.FanSaveDto;

import java.util.List;

public record ExcelResponseDto(List<FanSaveDto> blackList, List<FanSaveDto> notBlackList, int cnt) {}
