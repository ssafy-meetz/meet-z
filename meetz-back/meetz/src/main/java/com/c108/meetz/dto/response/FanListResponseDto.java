package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
public class FanListResponseDto {

    private List<FanList> fanList;
    private FanListResponseDto(List<FanList> fanList) {
        this.fanList = fanList;
    }

    public static FanListResponseDto of(List<FanList> fanList){
        return new FanListResponseDto(fanList);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class FanList{
        private int userId;
        private String name;
        private String email;
        private String phone;

        public static FanList of(User user) {
            FanList fanList = new FanList();
            fanList.userId = user.getUserId();
            fanList.name = user.getName();
            fanList.email = user.getEmail();
            fanList.phone = user.getPhone();
            return fanList;
        }
    }
}
