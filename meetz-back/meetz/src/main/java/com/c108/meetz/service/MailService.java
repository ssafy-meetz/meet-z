package com.c108.meetz.service;

import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.repository.ManagerRepository;
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
    private static final String senderEmail= "meetz.c108@gmail.com";
    private static int number;
    private final RedisTemplate<String, String> redisTemplate;
    private final ManagerRepository managerRepository;

    public boolean checkEmail(String email) {
        if (managerRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }

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
            message.setSubject("[MEET:Z]인증번호 안내 메일");
            String body = "";
            body += "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;'>";
            body += "<h2 style='color: #FE4D5C; text-align: center;'>MEET:Z 인증번호 안내</h2>";
            body += "<p style='font-size: 16px; color: #333;'>안녕하세요,</p>";
            body += "<p style='font-size: 16px; color: #333;'>MEET:Z 서비스를 이용해 주셔서 감사합니다.</p>";
            body += "<p style='font-size: 16px; color: #333;'>아래의 인증번호를 입력하여 이메일 인증을 완료해 주세요:</p>";
            body += "<div style='text-align: center; margin: 20px 0;'>";
            body += "<span style='display: inline-block; font-size: 24px; color: #FE4D5C; padding: 10px 20px; border: 2px solid #FE4D5C; border-radius: 5px;'>" + number + "</span>";
            body += "</div>";
            body += "<p style='font-size: 16px; color: #333;'>인증번호는 보안을 위해 타인과 공유하지 마세요.</p>";
            body += "<p style='font-size: 16px; color: #333;'>감사합니다.<br>MEET:Z 팀</p>";
            body += "<div style='text-align: center; margin-top: 30px;'>";
            body += "</div>";
            body += "</div>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            throw new BadRequestException();
        }

        return message;
    }

    public int sendMail(String mail) {
        MimeMessage message = CreateMail(mail);
        try {
            javaMailSender.send(message);
        }catch (Exception e){
            throw new BadRequestException();
        }
        return number;
    }
}