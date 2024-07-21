package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.exception.CustomException;
import com.c108.meetz.jwt.JWTUtil;
import com.c108.meetz.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.util.Optional;
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
                return new LoginResponseDto(access, refresh, expireAt, "MANAGER");
            }

        }
        throw new CustomException(USER_NOT_FOUND);
    }


}
