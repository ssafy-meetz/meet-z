package com.c108.meetz.jwt;

import com.c108.meetz.dto.CustomUserDetails;
import com.c108.meetz.dto.request.CommonDto;
import com.c108.meetz.exception.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    public JWTFilter(JWTUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.debug("jwtfilter 시작");
        //request 에서 Authorization 헤더 찾음
        String authorization = request.getHeader("Authorization");
        if(authorization == null || !authorization.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }
        //헤더에서 access키에 담긴 토큰을 꺼냄
        String token = authorization.split(" ")[1];
        String requestURI = request.getRequestURI();
        //토큰이 없다면 다음 필터로 넘김
        if(token == null){
            filterChain.doFilter(request, response);
            return;
        }
        //토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            logger.debug("JWTFilter: 토큰 만료");
            throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
        }

        String email = jwtUtil.getEmail(token);
        String role = jwtUtil.getRole(token);
        String storedToken = jwtUtil.getToken(email);
        String category = jwtUtil.getCategory(token);

        if(requestURI.equals("/api/refresh")){ // 재발급이면
            if(!category.equals("refresh")){
                throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
            }
        }
        else{
            if(!category.equals("access")){
                throw new UnauthorizedException("만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요.");
            }
            //로그인한 유저가 있다면 현재 로그인 시도를 차단
//            if(storedToken != null && !storedToken.equals(token)){
//                throw new UnauthorizedException("이미 다른 기기에서 로그인된 상태입니다. 로그아웃 후 다시 시도하세요.");
//            }
        }

        CommonDto commonDto = new CommonDto(email, role);
        CustomUserDetails customUserDetails = new CustomUserDetails(commonDto);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
        logger.debug("JWTFilter: 종료");
        filterChain.doFilter(request, response);
    }
}