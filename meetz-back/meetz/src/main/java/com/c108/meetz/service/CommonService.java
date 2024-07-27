package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.CommonDto;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.exception.UnauthorizedException;
import com.c108.meetz.jwt.JWTUtil;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CommonService {

    private final ManagerRepository managerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        if(loginRequestDto.isManager()){
            Manager manager = managerRepository.findByEmail(loginRequestDto.email()).orElseThrow(()-> new NotFoundException("존재하지 않는 회원입니다."));
            if(!bCryptPasswordEncoder.matches(loginRequestDto.password(), manager.getPassword())){
                throw new NotFoundException("존재하지 않는 회원입니다.");
            }
            String access = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", 86400000L);
            String refresh = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", 86400000L*60); //60일
            managerRepository.updateRefreshToken(manager.getEmail(), refresh);
            LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
            Authentication authentication  = new UsernamePasswordAuthenticationToken(manager.getEmail(), null, List.of(new SimpleGrantedAuthority("MANAGER")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new LoginResponseDto(refresh, access, expireAt, "MANAGER");
        }
        User user = userRepository.findByEmailAndPassword(loginRequestDto.email(), loginRequestDto.password()).orElseThrow(()-> new NotFoundException("존재하지 않는 회원입니다."));

        String access = jwtUtil.createJwt("access", user.getEmail(), String.valueOf(user.getRole()), 86400000L);
        String refresh = jwtUtil.createJwt("refresh", user.getEmail(), String.valueOf(user.getRole()), 86400000L*60); //60일
        userRepository.updateRefreshToken(user.getEmail(), refresh);
        LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
        Authentication authentication  = new UsernamePasswordAuthenticationToken(user.getEmail(), null, List.of(new SimpleGrantedAuthority(String.valueOf(user.getRole()))));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new LoginResponseDto(refresh, access, expireAt, String.valueOf(user.getRole()));
    }

    public LoginResponseDto refreshToken(String header) {
        if(!header.startsWith("Bearer ")){
            throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
        }
        String refreshToken = header.substring(7);
        String email = jwtUtil.getEmail(refreshToken);
        String role = jwtUtil.getRole(refreshToken);
        if(role.equals("MANAGER")){
            boolean isExist = managerRepository.existsByToken(refreshToken);
            if(isExist){
                Manager manager = managerRepository.findByEmail(email).orElseThrow(()->new NotFoundException("존재하지 않는 회원입니다."));
                String newRefreshToken = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", 86400000L * 60);
                String newAccessToken = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", 86400000L);
                managerRepository.updateRefreshToken(manager.getEmail(), newRefreshToken);
                LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
                return new LoginResponseDto(newRefreshToken, newAccessToken, expireAt, "MANAGER");
            }
            else{
                throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
            }
        }
        boolean isExist = userRepository.existsByToken(refreshToken);
        if(isExist){
            User user = userRepository.findByEmail(email).orElseThrow(()->new NotFoundException("존재하지 않는 회원입니다."));
            String newRefreshToken = jwtUtil.createJwt("refresh", user.getEmail(), String.valueOf(user.getRole()), 86400000L * 60);
            String newAccessToken = jwtUtil.createJwt("access", user.getEmail(), String.valueOf(user.getRole()), 86400000L);
            userRepository.updateRefreshToken(user.getEmail(), newRefreshToken);
            LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
            return new LoginResponseDto(newRefreshToken, newAccessToken, expireAt, String.valueOf(user.getRole()));
        }
        else{
            throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
        }
    }

    public CommonDto checkInfo(){
        String email = SecurityUtil.getCurrentUserEmail();
        String role = SecurityUtil.getCurrentUserRole();
        return new CommonDto(email, role);
    }

}
