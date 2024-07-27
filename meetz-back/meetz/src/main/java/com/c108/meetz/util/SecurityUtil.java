package com.c108.meetz.util;

import com.c108.meetz.exception.NotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.c108.meetz.constants.ErrorCode.USER_NOT_FOUND;

public class SecurityUtil {

    private SecurityUtil() {}

    public static String getCurrentUserEmail(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == null){
            throw new NotFoundException("존재하지 않는 회원입니다.");
        }
        return authentication.getName();
    }

    public static String getCurrentUserRole(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || authentication.getPrincipal() == null){
            throw new NotFoundException("존재하지 않는 회원입니다.");
        }
        return authentication.getAuthorities().iterator().next().getAuthority();
    }
}
