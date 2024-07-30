package com.c108.meetz.dto.response;

import com.c108.meetz.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
public class StarListResponseDto {
    private List<StarList> starList;
    private StarListResponseDto(List<StarList> starList){
        this.starList = starList;
    }

    public static StarListResponseDto of(List<StarList> starList){
        return new StarListResponseDto(starList);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class StarList{
        private int meetingRoomId;
        private String name;
        private String email;
        private String password;

        public static StarList of(User user){
            StarList starList = new StarList();
            starList.name = user.getName();
            starList.email = user.getEmail();
            starList.password = user.getPassword();
            return starList;
        }

    }
}
