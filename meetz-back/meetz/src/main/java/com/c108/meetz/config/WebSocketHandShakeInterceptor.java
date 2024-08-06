package com.c108.meetz.config;

import com.c108.meetz.exception.UnauthorizedException;
import com.c108.meetz.jwt.JWTUtil;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URI;
import java.util.Map;

@Component
public class WebSocketHandShakeInterceptor implements HandshakeInterceptor {
    private final JWTUtil jwtUtil;
    public WebSocketHandShakeInterceptor(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        URI uri = request.getURI();
        String query = uri.getQuery();
        String token = null;

        if (query != null && query.startsWith("token=")) {
            token = query.substring(6);
        }

        if (token == null) {
            throw new UnauthorizedException("JWT 토큰이 쿼리 파라미터에 없습니다.");
        }

        if (jwtUtil.isExpired(token)) {
            throw new UnauthorizedException("JWT 토큰이 만료되었거나 잘못되었습니다.");
        }

        System.out.println("WebSocket connection authorized for token: " + token);

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
