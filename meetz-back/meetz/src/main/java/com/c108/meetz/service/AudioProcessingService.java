package com.c108.meetz.service;

import com.c108.meetz.dto.response.TranscriptionResponseDto;
import com.c108.meetz.dto.response.TranscriptionResponseDto.ProfanityCheckResult;
import com.c108.meetz.exception.BadRequestException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
@Slf4j
public class AudioProcessingService {

    @Value("${azure.speech.key}")
    private String subscriptionKey;

    @Value("${azure.speech.region}")
    private String serviceRegion;

    @Value("${naver.api.client.id}")
    private String naverClientId;

    @Value("${naver.api.client.secret}")
    private String naverClientSecret;

    /**
     * MP4 파일을 받아 음성 인식을 통해 텍스트로 변환하는 메서드
     * @param file 업로드된 MP4 파일
     * @return 변환된 텍스트
     * @throws BadRequestException 파일 처리 중 발생한 예외 처리
     */
    public String transcribeAudio(MultipartFile file) {
        File tempWavFile = null;
        try {
            // MP4 파일을 임시 파일로 저장
            File tempMp4File = File.createTempFile("audio", ".mp4");
            try (FileOutputStream fos = new FileOutputStream(tempMp4File)) {
                // 업로드된 파일의 입력 스트림을 임시 파일의 출력 스트림으로 복사
                IOUtils.copy(file.getInputStream(), fos);
            }

            // MP4 파일을 WAV 파일로 변환
            tempWavFile = File.createTempFile("audio", ".wav");
            // ffmpeg 명령어를 사용하여 MP4 파일을 WAV 파일로 변환
            String command = String.format("ffmpeg -i %s -vn -acodec pcm_s16le -ar 44100 -ac 2 %s", tempMp4File.getAbsolutePath(), tempWavFile.getAbsolutePath());
            // 주어진 명령어 실행을 위해 새로운 프로세스 생성, 파일 변환 과정 프로세스임.
            Process process = Runtime.getRuntime().exec(command);
            // 변환 프로세스가 완료될 때까지 대기
            process.waitFor();

            // 변환된 WAV 파일을 사용하여 음성 인식
            // 변환된 WAV 파일을 입력으로 하는 AudioConfig 생성
            AudioConfig audioInput = AudioConfig.fromWavFileInput(tempWavFile.getAbsolutePath());
            // Azure Speech Service를 위한 설정 생성
            SpeechConfig speechConfig = SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
            // SpeechRecognizer 객체 생성
            SpeechRecognizer recognizer = new SpeechRecognizer(speechConfig, audioInput);

            // 비동기로 음성 인식 결과를 가져옴
            Future<SpeechRecognitionResult> task = recognizer.recognizeOnceAsync();
            // 음성 인식 결과를 기다리고 가져옴
            SpeechRecognitionResult result = task.get();

            // 인식된 텍스트를 반환
            return result.getText();
        } catch (IOException | InterruptedException | ExecutionException e) {
            log.error("Error during audio processing", e);
            throw new BadRequestException("오디오 파일 처리 중 오류가 발생했습니다.");
        } finally {
            // 임시 WAV 파일 삭제
            if (tempWavFile != null && tempWavFile.exists()) {
                boolean deleted = tempWavFile.delete();
                if (!deleted) {
                    log.warn("Failed to delete temp WAV file: {}", tempWavFile.getAbsolutePath());
                }
            }
        }
    }

    /**
     * 변환된 텍스트를 받아 비속어를 검출하는 메서드
     * @param transcript 변환된 텍스트
     * @return 비속어 검출 결과 리스트
     * @throws BadRequestException 비속어 검출 중 발생한 예외 처리
     */
    public List<ProfanityCheckResult> checkProfanity(String transcript) {
        List<ProfanityCheckResult> results = new ArrayList<>();
        try {
            // 네이버 클로바 API에 요청을 위한 URL과 헤더 설정
            String apiUrl = "https://naveropenapi.apigw.ntruss.com/nlp/v1/profanity";

            // HttpHeaders 객체를 생성하여 API 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-NCP-APIGW-API-KEY-ID", naverClientId);
            headers.set("X-NCP-APIGW-API-KEY", naverClientSecret);
            headers.set("Content-Type", "application/json");

            // 요청 본문에 텍스트 데이터를 JSON 형식으로 포함
            String body = "{\"text\":\"" + transcript + "\"}";

            // HttpEntity 객체를 생성하여 요청 본문과 헤더를 포함
            HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

            // RestTemplate을 이용하여 API 호출
            RestTemplate restTemplate = new RestTemplate();

            // POST 요청을 보내고 응답을 받아옴.
            ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
            String responseBody = responseEntity.getBody();

            // JSON 파싱하여 비속어 검출 결과 추출
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode resultNode = rootNode.path("results");

            // 결과 노드를 순회하며 비속어 검출 결과를 리스트에 추가
            for (JsonNode node : resultNode) {
                int index = node.path("word_index").asInt();
                String word = node.path("word").asText();
                results.add(new ProfanityCheckResult(index, word));
            }
        } catch (IOException e) {
            log.error("Error during profanity check");
            throw new BadRequestException("비속어 검출 중 오류 발생");
        }
        return results;
    }
}
