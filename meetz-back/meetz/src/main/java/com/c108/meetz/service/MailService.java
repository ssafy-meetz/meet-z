package com.c108.meetz.service;

import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static com.c108.meetz.domain.Role.FAN;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail= "meetz.c108@gmail.com";
    private static int number;
    private final RedisTemplate<String, String> redisTemplate;
    private final ManagerRepository managerRepository;
    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

    public boolean checkEmail(String email) {
        return managerRepository.existsByEmail(email);
    }

    //redis에 메일과 number를 넣는 코드
    public void saveEmail(String email, String sendedNum) {
        // TTL 설정 (300초)
        log.info("보낼 email={}", email);
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

    public MimeMessage createTemporaryMail(User user, Meeting meeting) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(senderEmail);
            helper.setTo(user.getOriginEmail());
            message.setSubject("[MEET:Z] 팬싸인회 참여 안내 메일");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일 HH:mm");
            String meetingStartFormatted = meeting.getMeetingStart().format(formatter);

            String body = "";
            body += "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;'>";
            body += "<div style='border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #fff;'>";
            body += "<div style='background-color: #FE4D5C; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;'>";
            body += "<h1 style='margin: 0; color: #fff;'>" + meeting.getMeetingName() + "</h1>";
            body += "<h2 style='margin: 5px 0; color: #fff;'>" + meetingStartFormatted + "</h2>";
            body += "</div>";
            body += "<div style='padding: 20px; text-align: center;'>";
            body += "<img src='cid:meetzlogo' alt='Meetz Logo' style='width: 40%; height: auto; border-radius: 10px;'>";
            body += "</div>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>안녕하세요.</p>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>MEET:Z 서비스를 이용해 주셔서 감사합니다.</p>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>팬싸인회 참여 안내드립니다.</p>";
            body += "<div style='margin: 20px 0; text-align: center;'>";
            body += "<p style='font-size: 16px; color: #333;'>팬싸인회 진행 정보:</p>";
            body += "<ul style='font-size: 16px; color: #333; list-style-type: none; padding: 0; text-align: center;'>";
            body += "<li style='margin-bottom: 5px;'>진행 시간: " + meeting.getMeetingDuration() + "초 / 대기 시간: " + meeting.getTerm() + "초</li>";
            body += "</ul>";
            body += "</div>";
            body += "<div style='margin: 20px 0; text-align: center;'>";
            body += "<div style='display: inline-block; font-size: 16px; color: #FE4D5C; padding: 10px 20px; border: 2px solid #FE4D5C; border-radius: 5px; background-color: #fee;'>";
            body += "<p>임시 이메일: " + user.getEmail() + "</p>";
            body += "<p>임시 비밀번호: " + user.getPassword() + "</p>";
            body += "</div>";
            body += "</div>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>팬싸인회 당일 <a href='https://i11c108.p.ssafy.io/' style='color: #FE4D5C; text-decoration: none;'>https://i11c108.p.ssafy.io/</a> 사이트로 접속 후 위 계정으로 로그인해주세요.</p>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>또한 안내드린 임시 계정은 보안을 위해 타인과 공유하지 마세요.</p>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>해당 계정은 팬싸인회 종료 이후 24시간 뒤에 삭제됩니다.</p>";
            body += "<p style='font-size: 16px; color: #333; text-align: center;'>감사합니다.</p>";
            body += "<div style='margin-top: 20px; text-align: center;'>";
            body += "<p style='font-size: 20px; color: #FE4D5C; text-align: center;'>MEET:Z</p>";
            body += "</div>";
            body += "</div>";
            body += "</div>";

            helper.setText(body, true);
            ClassPathResource image = new ClassPathResource("Meetzlogo.png");
            helper.addInline("meetzlogo", image);
        } catch (MessagingException e) {
            throw new BadRequestException();
        }

        return message;
    }

    public void sendMailToFan(int meetingId){
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(()->  new NotFoundException("존재하지 않는 미팅입니다."));
        List<User> fans = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN);
        for(User user : fans){
            MimeMessage message = createTemporaryMail(user, meeting);
            try {
                javaMailSender.send(message);
            }catch (Exception e){
                throw new BadRequestException();
            }
        }
    }

    public void sendImageToFan(List<MultipartFile> files){
        User user = getUser();
        if(files == null || files.isEmpty()){
            throw new BadRequestException("첨부된 사진이 없습니다.");
        }
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(senderEmail);
            helper.setTo(user.getOriginEmail());
            message.setSubject("[MEET:Z] 스타와 찍은 사진을 보내드립니다.");

            String body = "";
            body += "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;'>";
            body += "    <div style='border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #fff;'>";
            body += "        <div style='background-color: #FE4D5C; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;'>";
            body += "            <h1 style='margin: 0; color: #fff;'>MEET:Z</h1>";
            body += "        </div>";
            body += "        <div style='height: 20px;'></div>";
            body += "        <p style='font-size: 16px; color: #333; text-align: center;'>안녕하세요.</p>";
            body += "        <p style='font-size: 16px; color: #333; text-align: center;'>MEET:Z 서비스를 이용해 주셔서 감사합니다.</p>";
            body += "        <p style='font-size: 16px; color: #333; text-align: center;'>첨부된 사진을 확인해주세요.</p>";
            body += "    <p style='font-size: 16px; color: #333; text-align: center;'>감사합니다.</p>";
            body += "        <div style='margin: 20px 0; text-align: center;'>";
            body += "        </div>";
            body += "    </div>";
            body += "    <p style='font-size: 20px; color: #FE4D5C; text-align: center;'>MEET:Z</p>";
            body += "</div>";

            helper.setText(body, true);
            for(MultipartFile file : files){
                String fileName = file.getOriginalFilename();
                InputStreamSource inputSteamSource = file::getInputStream;
                helper.addAttachment(fileName, inputSteamSource);
            }
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new BadRequestException();
        }
    }

    private User getUser(){
        String email = SecurityUtil.getCurrentUserEmail();
        return userRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException("user not found"));
    }
}