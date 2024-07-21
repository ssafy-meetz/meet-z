package com.c108.meetz.util;

import com.c108.meetz.exception.CustomException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.c108.meetz.constants.ErrorCode.USER_NOT_FOUND;

public class SecurityUtil {

    private SecurityUtil() {}

    public static String getCurrentUserEmail(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == null){
            throw new CustomException(USER_NOT_FOUND);
        }
        return authentication.getName();
    }
}
