package com.c108.meetz.dto.response;

import com.c108.meetz.domain.BlackList;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class BlackListInfoListResponseDto {
    String company;
    List<BlackListInfo> blackList;

    private BlackListInfoListResponseDto(String company, List<BlackListInfo> blackList){
        this.company = company;
        this.blackList = blackList;
    }

    public static BlackListInfoListResponseDto from(String company, List<BlackListInfo> blackList){
        return new BlackListInfoListResponseDto(company, blackList);
    }

    @Getter
    @Setter
    public static class BlackListInfo{
        int blacklistId;
        String name;
        String phone;

        public static BlackListInfo from(BlackList blackList){
            BlackListInfo blackListInfo = new BlackListInfo();
            blackListInfo.setBlacklistId(blackList.getBlacklistId());
            blackListInfo.setName(blackList.getName());
            blackListInfo.setPhone(blackList.getPhone());
            return blackListInfo;
        }

    }

}
