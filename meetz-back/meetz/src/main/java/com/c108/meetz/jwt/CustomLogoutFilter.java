package com.c108.meetz.jwt;


import com.c108.meetz.repository.ManagerRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {
    private final JWTUtil jwtUtil;
    private final ManagerRepository managerRepository;
    private final RedisTemplate<String, String> redisTemplate;
    public CustomLogoutFilter(JWTUtil jwtUtil, ManagerRepository managerRepository, RedisTemplate<String,String> redisTemplate) {
        this.jwtUtil = jwtUtil;
        this.managerRepository = managerRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        //path and method verify
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("/api/logout")) {
            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }
        String authorization = request.getHeader("Authorization");
        if(authorization == null || !authorization.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        String token = authorization.split(" ")[1];

        //expired check
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(token);
        if (!category.equals("refresh")) {
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //DB에 저장되어 있는지 확인
        Boolean isExist = managerRepository.existsByToken(token);
        if (!isExist) {
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        String email = jwtUtil.getEmail(token);
        jwtUtil.deleteToken(email);
        //로그아웃 진행
        //Refresh 토큰 DB에서 제거
        managerRepository.updateTokenToNull(token);
        response.setStatus(HttpServletResponse.SC_OK);


    }
}