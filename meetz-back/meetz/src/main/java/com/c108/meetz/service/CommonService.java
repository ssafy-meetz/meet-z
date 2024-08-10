package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.CommonDto;
import com.c108.meetz.dto.request.LoginRequestDto;
import com.c108.meetz.dto.response.LoginResponseDto;
import com.c108.meetz.exception.ForbiddenException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.exception.UnauthorizedException;
import com.c108.meetz.jwt.JWTUtil;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
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

    private final OpenviduService openviduService;
    private final ManagerRepository managerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;

    private static final long ACCESS_TOKEN_EXPIRATION = 86400000L;
    private static final long REFRESH_TOKEN_EXPIRATION = 86400000L * 60;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        if(loginRequestDto.isManager()){
            Manager manager = managerRepository.findByEmail(loginRequestDto.email()).orElseThrow(()-> new NotFoundException("존재하지 않는 회원입니다."));
            if(!bCryptPasswordEncoder.matches(loginRequestDto.password(), manager.getPassword())){
                throw new NotFoundException("존재하지 않는 회원입니다.");
            }
            // Redis에서 기존의 access 토큰을 확인
            String existingAccessToken = redisTemplate.opsForValue().get(manager.getEmail());
            if (existingAccessToken != null) {
                throw new UnauthorizedException("이미 다른 기기에서 로그인된 상태입니다. 로그아웃 후 다시 시도하세요.");
            }
            String access = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", ACCESS_TOKEN_EXPIRATION);
            String refresh = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", REFRESH_TOKEN_EXPIRATION);
            redisTemplate.opsForValue().set(manager.getEmail(), access);
            manager.setToken(refresh);
            managerRepository.save(manager);
            LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
            Authentication authentication  = new UsernamePasswordAuthenticationToken(manager.getEmail(), null, List.of(new SimpleGrantedAuthority("MANAGER")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new LoginResponseDto(refresh, access, expireAt, "MANAGER");
        }

        User user = userRepository.findByEmailAndPassword(loginRequestDto.email(), loginRequestDto.password()).orElseThrow(()-> new NotFoundException("존재하지 않는 회원입니다."));
        // Redis에서 기존의 access 토큰을 확인
        String existingAccessToken = redisTemplate.opsForValue().get(user.getEmail());
        if (existingAccessToken != null) {
            throw new UnauthorizedException("이미 다른 기기에서 로그인된 상태입니다. 로그아웃 후 다시 시도하세요.");
        }

        //방 생성이 되지 않았을 때 로그인을 막자.
        int meetingId = user.getMeeting().getMeetingId();

        if (!openviduService.existByMeetingRoomsId(meetingId)) {
            throw new ForbiddenException("아직 대기방이 생성되지 않았습니다.");
        }

        String access = jwtUtil.createJwt("access", user.getEmail(), String.valueOf(user.getRole()), ACCESS_TOKEN_EXPIRATION);
        String refresh = jwtUtil.createJwt("refresh", user.getEmail(), String.valueOf(user.getRole()), REFRESH_TOKEN_EXPIRATION);
        redisTemplate.opsForValue().set(user.getEmail(), access);
        userRepository.save(user);
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
        redisTemplate.delete(email);
        if(role.equals("MANAGER")){
            boolean isExist = managerRepository.existsByToken(refreshToken);
            if(isExist){
                Manager manager = managerRepository.findByEmail(email).orElseThrow(()->new NotFoundException("존재하지 않는 회원입니다."));
                String newRefreshToken = jwtUtil.createJwt("refresh", manager.getEmail(), "MANAGER", 86400000L * 60);
                String newAccessToken = jwtUtil.createJwt("access", manager.getEmail(), "MANAGER", 86400000L);
                redisTemplate.opsForValue().set(manager.getEmail(), newAccessToken);
                manager.setToken(newRefreshToken);
                managerRepository.save(manager);
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
            redisTemplate.opsForValue().set(user.getEmail(), newAccessToken);
            user.setToken(newRefreshToken);
            userRepository.save(user);
            LocalDateTime expireAt = LocalDateTime.now().plusDays(60);
            return new LoginResponseDto(newRefreshToken, newAccessToken, expireAt, String.valueOf(user.getRole()));
        }
        else{
            throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
        }
    }


    public CommonDto checkInfo() {
        String email = SecurityUtil.getCurrentUserEmail();
        String role = SecurityUtil.getCurrentUserRole();
        return new CommonDto(email, role);
    }
}

