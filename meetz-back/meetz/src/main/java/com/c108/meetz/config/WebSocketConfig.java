package com.c108.meetz.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); //메세지 받을 때 경로
        config.setApplicationDestinationPrefixes("/pub"); //메세지 보낼 때 경로
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("https://i11c108.p.ssafy.io", "http://localhost:3000", "http://localhost:5173", "http://i11c108.p.ssafy.io:3000", "http://i11c108.p.ssafy.io:5173")
                .withSockJS();
    }


}
