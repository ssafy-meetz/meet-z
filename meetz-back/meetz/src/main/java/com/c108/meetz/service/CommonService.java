package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.request.CommonDto;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.exception.CustomException;
import com.c108.meetz.jwt.JWTUtil;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.c108.meetz.constants.ErrorCode.UNAUTHORIZED_USER;
import static com.c108.meetz.constants.ErrorCode.USER_NOT_FOUND;


@RequiredArgsConstructor
@Service
public class CommonService {

    private final ManagerRepository managerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil jwtUtil;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        if(loginRequestDto.getIsManager()){
            Optional<Manager> optionalManager = managerRepository.findByEmail(loginRequestDto.getEmail());
            if(optionalManager.isPresent()){
                Manager manager = optionalManager.get();
                if(!bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), manager.getPassword())){
                    throw new CustomException(USER_NOT_FOUND);
                }
                String access = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", 86400000L);
                String refresh = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", 86400000L*60); //60일
                managerRepository.updateRefreshToken(manager.getEmail(), refresh);
                LocalDateTime expirationTime = LocalDateTime.now().plusDays(60);
                OffsetDateTime offsetExpirationTime = expirationTime.atOffset(ZoneOffset.UTC);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                String expireAt = offsetExpirationTime.format(formatter);

                Authentication authentication  = new UsernamePasswordAuthenticationToken(manager.getEmail(), null, List.of(new SimpleGrantedAuthority("MANAGER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return new LoginResponseDto(refresh, access, expireAt, "MANAGER");
            }
            throw new CustomException(USER_NOT_FOUND);
        }
        throw new CustomException(USER_NOT_FOUND);
    }

    public LoginResponseDto refreshToken(String header) {
        if(!header.startsWith("Bearer ")){
            throw new CustomException(UNAUTHORIZED_USER);
        }
        String refreshToken = header.substring(7);
        String email = jwtUtil.getEmail(refreshToken);
        String role = jwtUtil.getRole(refreshToken);
        if(role.equals("MANAGER")){
            boolean isExist = managerRepository.existsByToken(refreshToken);
            if(isExist){
                Manager manager = managerRepository.findByEmail(email).orElseThrow(()->new CustomException(USER_NOT_FOUND));
                String newRefreshToken = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", 86400000L * 60);
                String newAccessToken = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", 86400000L);
                managerRepository.updateRefreshToken(manager.getEmail(), newRefreshToken);
                LocalDateTime expirationTime = LocalDateTime.now().plusDays(60);
                OffsetDateTime offsetExpirationTime = expirationTime.atOffset(ZoneOffset.UTC);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                String expireAt = offsetExpirationTime.format(formatter);
                return new LoginResponseDto(newRefreshToken, newAccessToken, expireAt, "MANAGER");
            }
            else{
                throw new CustomException(UNAUTHORIZED_USER);
            }
        }
        throw new CustomException(USER_NOT_FOUND);
    }

    public CommonDto checkInfo(){
        CommonDto commonDto = new CommonDto();
        String email = SecurityUtil.getCurrentUserEmail();
        commonDto.setEmail(email);
        commonDto.setPassword("temp");
        if(managerRepository.findByEmail(email).isPresent()){
            commonDto.setRole("MANAGER");
        }
        return commonDto;
    }

}
