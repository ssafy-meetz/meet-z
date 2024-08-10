package com.c108.meetz.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.Report;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.response.TranscriptionResponseDto;
import com.c108.meetz.dto.response.TranscriptionResponseDto.TranscriptionSegment;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.ReportRepository;
import com.c108.meetz.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.c108.meetz.domain.Role.FAN;

@Service
@RequiredArgsConstructor
@Slf4j
public class AudioProcessingService {

    private final BadWordsFilteringService badWordsFilteringService;
    private final ClovaSpeechClient clovaSpeechClient;
    private final S3UploadService s3UploadService;
    private final ReportRepository reportRepository;
    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final AmazonS3 s3Client;  // AmazonS3 클라이언트 추가

    /**
     * 퍼블릭 접근 권한을 가진 버킷을 생성하는 메서드.
     *
     * @param bucketName 생성할 버킷의 이름
     */
    private void createPublicBucket(String bucketName) {
        if (!s3Client.doesBucketExistV2(bucketName)) {
            // 버킷 생성
            CreateBucketRequest createBucketRequest = new CreateBucketRequest(bucketName);
            Bucket bucket = s3Client.createBucket(createBucketRequest);

            // 버킷에 퍼블릭 읽기 권한 설정
            s3Client.setBucketAcl(bucketName, CannedAccessControlList.PublicRead);
            log.debug("퍼블릭 접근 권한을 가진 버킷 생성 완료: {}", bucket.getName());
        } else {
            log.debug("버킷이 이미 존재합니다: {}", bucketName);
        }
    }

    /**
     * 오디오 스트림을 처리하여 비속어 여부를 확인한 후, 결과를 반환하는 메서드.
     *
     * @param audioInputStream 오디오 데이터 스트림
     * @return 변환된 텍스트와 비속어 여부가 포함된 TranscriptionResponseDto 객체
     */
    public TranscriptionResponseDto processAudioFromStream(InputStream audioInputStream) {
        try {
            log.debug("processAudioFromStream 시작");

            // InputStream을 File로 변환
            File tempFile = convert(audioInputStream);

            // 1. 클로바 스피치 API를 호출하여 오디오 파일을 텍스트로 변환
            ClovaSpeechClient.NestRequestEntity requestEntity = new ClovaSpeechClient.NestRequestEntity();
            requestEntity.setLanguage("ko-KR");
            requestEntity.setCompletion("sync");
            String response = clovaSpeechClient.upload(tempFile, requestEntity);

            log.debug("클로바 스피치 API 응답 수신: {}", response);

            // 2. 응답에서 텍스트와 비속어를 파싱
            List<TranscriptionSegment> segments = parseResponse(response);
            String transcript = buildTranscript(segments);
            boolean hasProfanityInTranscript = segments.stream().anyMatch(segment -> !segment.getBadWordsList().isEmpty());

            // TranscriptionResponseDto에 파일 경로도 포함시켜서 생성
            TranscriptionResponseDto responseDto = new TranscriptionResponseDto(transcript, hasProfanityInTranscript, segments, null);

            log.debug("응답 생성 완료: {}", responseDto);

            return responseDto;
        } catch (IOException e) {
            log.error("오디오 스트림 처리 중 오류가 발생했습니다.", e);
            throw new BadRequestException("오디오 스트림 처리 중 오류가 발생했습니다.");
        } catch (Exception e) {
            log.error("클로바 스피치 API 호출 중 오류가 발생했습니다.", e);
            throw new BadRequestException("클로바 스피치 API 호출 중 오류가 발생했습니다.");
        }
    }

    /**
     * 오디오 파일을 처리하여 비속어 여부를 확인한 후, 신고 데이터를 생성 또는 업데이트하는 메서드.
     *
     * @param file      업로드된 오디오 파일
     * @param meetingId 미팅 ID
     * @param starId    스타 사용자 ID
     * @return 변환된 텍스트와 비속어 여부가 포함된 TranscriptionResponseDto 객체
     */
    public TranscriptionResponseDto processAudioAndHandleReport(MultipartFile file, int meetingId, int fanId, int starId) {
        try {
            log.debug("processAudioAndHandleReport 시작");

            // 1. 오디오 파일 처리: MultipartFile을 임시 파일로 변환
            File tempFile = File.createTempFile("audio", ".wav");
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            log.debug("임시 파일 생성 완료: {}", tempFile.getAbsolutePath());

            // 2. 클로바 스피치 API를 호출하여 오디오 파일을 텍스트로 변환
            ClovaSpeechClient.NestRequestEntity requestEntity = new ClovaSpeechClient.NestRequestEntity();
            requestEntity.setLanguage("ko-KR");
            requestEntity.setCompletion("sync");
            String response = clovaSpeechClient.upload(tempFile, requestEntity);

            log.debug("클로바 스피치 API 응답 수신: {}", response);

            // 3. 응답에서 텍스트와 비속어를 파싱
            List<TranscriptionSegment> segments = parseResponse(response);
            String transcript = buildTranscript(segments);
            boolean hasProfanityInTranscript = segments.stream().anyMatch(segment -> !segment.getBadWordsList().isEmpty());

            // 4. 신고 테이블 처리 로직
            String fileUrl = handleReportAfterMeeting(file, meetingId, fanId, starId, hasProfanityInTranscript);

            // TranscriptionResponseDto에 파일 경로를 추가
            TranscriptionResponseDto responseDto = new TranscriptionResponseDto(transcript, hasProfanityInTranscript, segments, fileUrl);

            log.debug("응답 생성 완료: {}", responseDto);

            return responseDto;
        } catch (IOException e) {
            log.error("오디오 파일 처리 중 오류가 발생했습니다.", e);
            throw new BadRequestException("오디오 파일 처리 중 오류가 발생했습니다.");
        } catch (Exception e) {
            log.error("클로바 스피치 API 호출 중 오류가 발생했습니다.", e);
            throw new BadRequestException("클로바 스피치 API 호출 중 오류가 발생했습니다.");
        }
    }

    /**
     * 신고 데이터를 생성하거나 기존 신고 데이터를 업데이트하는 메서드.
     *
     * @param file         업로드된 오디오 파일
     * @param meetingId    미팅 ID
     * @param starId       스타 사용자 ID
     * @param hasProfanity 오디오 파일에 비속어가 포함되었는지 여부
     * @return String 업로드된 파일의 URL
     */
    private String handleReportAfterMeeting(MultipartFile file, int meetingId, int fanId, int starId, boolean hasProfanity) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new BadRequestException("해당 미팅을 찾을 수 없습니다."));
        User star = userRepository.findById(starId)
                .orElseThrow(() -> new BadRequestException("해당 스타를 찾을 수 없습니다."));

        String fileUrl; // URL을 저장할 변수
        String bucketName = "meeting" + meetingId;  // 버킷 이름 설정

        // 1. 버킷 생성 (퍼블릭 접근 권한 부여)
        createPublicBucket(bucketName);

        // 기존 신고 데이터가 있는지 확인
        Optional<Report> existingReport = reportRepository.findByMeeting_MeetingIdAndFan_UserIdAndStar_UserId(meetingId, fanId, starId);

        if (existingReport.isPresent()) {
            // 신고가 이미 존재하는 경우: 파일 경로와 비속어 여부를 업데이트
            Report report = existingReport.get();
            String filePath = meetingId + "_" + starId + "_" + report.getFan().getUserId() + ".wav";
            fileUrl = s3UploadService.upload(file, bucketName, filePath); // fileUrl 저장
            report.setFilePath(fileUrl);
            report.setProfanity(hasProfanity);
            reportRepository.save(report);
            log.debug("기존 신고 업데이트 완료: {}", report);
        } else if (hasProfanity) {
            // 신고가 존재하지 않으며 비속어가 발견된 경우: 새로운 신고 생성
            List<User> byMeetingMeetingIdAndRole = userRepository.findByMeeting_MeetingIdAndRole(meetingId, FAN);
            User fan = (User) byMeetingMeetingIdAndRole;
            Report newReport = new Report(meeting, star, fan, true, hasProfanity, null);
            reportRepository.save(newReport);

            // 새로운 신고가 생성된 후 파일을 S3에 업로드
            String filePath = meetingId + "_" + starId + "_" + fan.getUserId() + ".wav";
            fileUrl = s3UploadService.upload(file, bucketName, filePath); // fileUrl 저장
            newReport.setFilePath(fileUrl);
            reportRepository.save(newReport);

            log.debug("새 신고 생성 및 파일 업로드 완료: {}", newReport);
        } else {
            fileUrl = ""; // 비속어가 발견되지 않으면 빈 문자열
        }

        return fileUrl; // URL 반환
    }

    /**
     * 클로바 스피치 API 응답을 파싱하여 텍스트와 비속어를 추출하는 메서드.
     *
     * @param responseBody 클로바 스피치 API 응답 JSON 문자열
     * @return 텍스트와 비속어 여부 리스트가 포함된 TranscriptionSegment 리스트
     * @throws IOException JSON 파싱 중 오류가 발생할 경우
     */
    private List<TranscriptionSegment> parseResponse(String responseBody) throws IOException {
        log.debug("parseResponse 시작");
        List<TranscriptionSegment> segments = new ArrayList<>();
        try {
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode segmentsNode = rootNode.path("segments");

            for (JsonNode segmentNode : segmentsNode) {
                int startTimeMillis = segmentNode.path("start").asInt();
                int endTimeMillis = segmentNode.path("end").asInt();
                String startTime = formatTime(startTimeMillis / 1000.0);
                String endTime = formatTime(endTimeMillis / 1000.0);
                String text = segmentNode.path("text").asText();
                List<String> badWordsList = checkProfanity(text);
                segments.add(new TranscriptionSegment(startTime, endTime, text, badWordsList));
            }

            log.debug("응답 파싱 완료, 세그먼트 수: {}", segments.size());
        } catch (IOException e) {
            log.error("클로바 스피치 API 응답 파싱 중 오류가 발생했습니다.", e);
            throw new BadRequestException("클로바 스피치 API 응답 파싱 중 오류가 발생했습니다.");
        }
        return segments;
    }


    /**
     * 여러 세그먼트를 하나의 텍스트로 결합하는 메서드.
     *
     * @param segments 변환된 텍스트 세그먼트 리스트
     * @return 결합된 전체 텍스트
     */
    private String buildTranscript(List<TranscriptionSegment> segments) {
        StringBuilder fullTranscript = new StringBuilder();
        for (TranscriptionSegment segment : segments) {
            fullTranscript.append(segment.getText()).append(" ");
        }
        return fullTranscript.toString().trim();
    }

    /**
     * 초 단위의 시간을 mm:ss 형식으로 변환하는 메서드.
     *
     * @param timeInSeconds 초 단위 시간
     * @return mm:ss 형식의 시간 문자열
     */
    private String formatTime(double timeInSeconds) {
        int totalSeconds = (int) Math.round(timeInSeconds);
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }

    /**
     * 텍스트에서 비속어를 검출하는 메서드.
     *
     * @param transcript 텍스트 문자열
     * @return 검출된 비속어 리스트
     */
    private List<String> checkProfanity(String transcript) {
        log.debug("checkProfanity 시작");
        List<String> badWordsList = new ArrayList<>();
        for (String word : transcript.split(" ")) {
            if (badWordsFilteringService.check(word)) {
                badWordsList.add(word);
            }
        }
        log.debug("비속어 검출 완료, 검출된 비속어 수: {}", badWordsList.size());
        return badWordsList;
    }

    /**
     * InputStream을 File로 변환하는 메서드
     *
     * @param inputStream 변환할 InputStream
     * @return 변환된 File 객체
     * @throws IOException 파일 변환 중 오류가 발생할 경우
     */
    public File convert(InputStream inputStream) throws IOException {
        // 임시 파일을 생성합니다. 두 번째 인자는 파일 확장자를 지정합니다.
        File tempFile = File.createTempFile("audio", ".wav");

        // FileOutputStream을 사용하여 InputStream의 데이터를 파일에 씁니다.
        try (FileOutputStream outputStream = new FileOutputStream(tempFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }

        // 파일을 반환합니다.
        return tempFile;
    }
}
