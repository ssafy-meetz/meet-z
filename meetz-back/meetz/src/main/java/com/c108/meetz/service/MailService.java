package com.c108.meetz.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail= "wlk256032@gmail.com";
    private static int number;
    private final RedisTemplate<String, String> redisTemplate;

    //redis에 메일과 number를 넣는 코드
    public void saveEmail(String email, String sendedNum) {
        // TTL 설정 (300초)
        redisTemplate.opsForValue().set(sendedNum, email, 300, TimeUnit.SECONDS);
        log.info("redis에 이메일 저장 성공");
    }

    //redis에 email에 따른 key값을 얻는 코드
    public String getEmail(String sendedNum) {
        log.info("redis에서 이메일 불러오기");
        return redisTemplate.opsForValue().get(sendedNum);
    }

    public String delEmail(String sendedNum) {
        log.info("redis에 이메일 삭제");
        return redisTemplate.opsForValue().getAndDelete(sendedNum);
    }

    // 랜덤으로 숫자 생성
    public static void createNumber() {
        number = (int)(Math.random() * (90000)) + 100000; //(int) Math.random() * (최댓값-최소값+1) + 최소값
    }

    public MimeMessage CreateMail(String mail) {
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("[Meet'z]인증번호 안내 메일");
            String body = "";
            body += "<h3>" + "[Meet'z] 인증번호 안내 메일입니다." + "</h3>";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    public int sendMail(String mail) {
        MimeMessage message = CreateMail(mail);
        javaMailSender.send(message);

        return number;
    }
}