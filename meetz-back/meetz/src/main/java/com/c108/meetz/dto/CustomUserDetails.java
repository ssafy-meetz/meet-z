package com.c108.meetz.dto;

import com.c108.meetz.dto.req.CommonDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {
    private final CommonDto commonDto;

    public CustomUserDetails(CommonDto commonDto) {

        this.commonDto = commonDto;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return commonDto.getRole();
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {

        return commonDto.getPassword();
    }

    @Override
    public String getUsername() {

        return commonDto.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}
