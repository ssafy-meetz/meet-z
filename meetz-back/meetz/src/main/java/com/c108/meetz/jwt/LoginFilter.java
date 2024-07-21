//package com.c108.meetz.jwt;
//
//import com.c108.meetz.dto.ApiResponse;
//import com.c108.meetz.dto.CustomUserDetails;
//import com.c108.meetz.dto.request.CommonDto;
//import com.c108.meetz.dto.request.LoginRequestDto;
//import com.c108.meetz.exception.CustomException;
//import com.c108.meetz.repository.ManagerRepository;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletInputStream;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.util.StreamUtils;
//
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.text.SimpleDateFormat;
//import java.util.*;
//
//import static com.c108.meetz.constants.ErrorCode.NO_ACCOUNT;
//import static com.c108.meetz.constants.SuccessCode.LOGIN_SUCCESS;
//
//public class LoginFilter extends UsernamePasswordAuthenticationFilter {
//    private final AuthenticationManager authenticationManager;
//    private final JWTUtil jwtUtil;
//    private final ManagerRepository managerRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, ManagerRepository managerRepository, PasswordEncoder passwordEncoder) {
//
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//        this.managerRepository = managerRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.setFilterProcessesUrl("/api/login");
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//
//        LoginRequestDto loginRequestDto = null;
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
////            ServletInputStream inputStream = request.getInputStream();
////            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
//            loginRequestDto = objectMapper.readValue(request.getInputStream(), LoginRequestDto.class);
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//
//        String email = loginRequestDto.getEmail();
//        String password = loginRequestDto.getPassword();
//        boolean isManager = loginRequestDto.getIsManager();
//
//        CustomUserDetails customUserDetails;
//        if(isManager){
//            customUserDetails = managerRepository.findByEmail(email)
//                    .map(manager->new CustomUserDetails(new CommonDto(manager.getEmail(), manager.getPassword(), "MANAGER")))
//                    .orElseThrow(()-> new CustomException(NO_ACCOUNT));
//        }
//        else customUserDetails = null;
//        if(customUserDetails == null || !passwordEncoder.matches(password, customUserDetails.getPassword())){
//            throw new CustomException(NO_ACCOUNT);
//        }
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password,null);
//        return authenticationManager.authenticate(authToken);
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
//
//        //유저 정보
//        //CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//        //String email = customUserDetails.getUsername();
//        //String role = customUserDetails.getAuthorities().iterator().next().getAuthority();
//        String email = authentication.getName();
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
//        GrantedAuthority auth = iterator.next();
//        String role = auth.getAuthority();
//        //토큰 생성
//        String access = jwtUtil.createJwt("access", email, role, 86400000L); //24시간
//        String refresh = jwtUtil.createJwt("refresh", email, role, 86400000L*60); //60일
//
//        if("MANAGER".equals(role)){
//            //Refresh 토큰 저장
//            managerRepository.updateRefreshToken(email, refresh);
//        }
//
//        Date expirationDate = jwtUtil.getExpireTime(access);
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
//        String formattedExpirationDate = sdf.format(expirationDate);
//
//        Map<String, Object> data = new HashMap<>();
//        data.put("refreshToken", refresh);
//        data.put("accessToken", access);
//        data.put("expireAt", formattedExpirationDate);
//
//        ApiResponse<Object> responseBody = ApiResponse.success(LOGIN_SUCCESS, data);
//        response.setContentType("application/json");
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.writeValue(response.getOutputStream(), responseBody);
//    }
//
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
//
//        response.setStatus(401);
//    }
//
//    private void saveRefreshToken(String email, String refresh, Long expiredMs) {
//
//        Date date = new Date(System.currentTimeMillis() + expiredMs);
//        managerRepository.updateRefreshToken(email, refresh);
////        RefreshEntity refreshEntity = new RefreshEntity();
////        refreshEntity.setUsername(username);
////        refreshEntity.setRefresh(refresh);
////        refreshEntity.setExpiration(date.toString());
////
////        refreshRepository.save(refreshEntity);
//    }
//
////    private Cookie createCookie(String key, String value) {
////
////        Cookie cookie = new Cookie(key, value);
////        cookie.setMaxAge(24*60*60);
////        //cookie.setSecure(true);
////        //cookie.setPath("/");
////        cookie.setHttpOnly(true);
////
////        return cookie;
////    }
//}
