package com.c108.meetz.jwt;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {
    private final JWTUtil jwtUtil;
    public JwtChannelInterceptor(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null && accessor.getCommand() != null) {
            if (accessor.getCommand().equals(StompCommand.CONNECT)) {
                String authorization = accessor.getFirstNativeHeader("Authorization");
                if (authorization == null || !authorization.startsWith("Bearer ")) {
                    throw new RuntimeException("Unauthorized: No JWT token found in WebSocket headers");
                }

                String token = authorization.split(" ")[1];
                if (jwtUtil.isExpired(token)) {
                    throw new RuntimeException("Unauthorized: JWT token is expired or invalid");
                }

                // 필요한 경우, 사용자 정보를 보안 컨텍스트에 추가
//                String email = jwtUtil.getEmail(token);
//                String role = jwtUtil.getRole(token);
                // 보안 컨텍스트에 인증 정보를 설정하는 코드 추가 가능
            }
        }
        return message;
    }
}
