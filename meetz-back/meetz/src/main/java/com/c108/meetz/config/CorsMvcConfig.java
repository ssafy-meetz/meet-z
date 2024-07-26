package com.c108.meetz.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        //port 3000 : 프론트 단에서 사용되는 포트
        corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000");
    }
}