package com.c108.meetz.service;

import com.c108.meetz.dto.response.TranscriptionResponseDto;
import com.c108.meetz.dto.response.TranscriptionResponseDto.TranscriptionSegment;
import com.c108.meetz.exception.BadRequestException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AudioProcessingService {

    private final BadWordsFilteringService badWordsFilteringService;
    private final ClovaSpeechClient clovaSpeechClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 오디오 파일을 처리하여 텍스트로 변환하고 비속어를 필터링하는 메서드
     *
     * @param file 업로드된 오디오 파일
     * @return 변환된 텍스트와 비속어 여부 리스트
     */
    public TranscriptionResponseDto processAudio(MultipartFile file) {
        try {
            log.debug("processAudio 시작");
            File tempFile = File.createTempFile("audio", ".wav");
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            log.debug("임시 파일 생성 완료: {}", tempFile.getAbsolutePath());

            ClovaSpeechClient.NestRequestEntity requestEntity = new ClovaSpeechClient.NestRequestEntity();
            requestEntity.setLanguage("ko-KR");
            requestEntity.setCompletion("sync");
            String response = clovaSpeechClient.upload(tempFile, requestEntity);

            log.debug("클로바 스피치 API 응답 수신: {}", response);

            List<TranscriptionSegment> segments = parseResponse(response);
            String transcript = buildTranscript(segments);
            List<TranscriptionSegment> filteredSegments = filterProfanitySegments(segments);

            log.debug("클로바 스피치 API 응답 처리 완료");

            boolean hasProfanityInTranscript = !filteredSegments.isEmpty();
            TranscriptionResponseDto responseDto = new TranscriptionResponseDto(transcript, hasProfanityInTranscript, filteredSegments);

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
     * 클로바 스피치 API 응답을 파싱하여 텍스트와 비속어를 추출하는 메서드
     *
     * @param responseBody 클로바 스피치 API 응답
     * @return 변환된 텍스트와 비속어 여부 리스트
     * @throws IOException 입출력 예외
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
     * 비속어가 포함된 세그먼트를 필터링하는 메서드
     *
     * @param segments 변환된 세그먼트 리스트
     * @return 비속어가 포함된 세그먼트 리스트
     */
    private List<TranscriptionSegment> filterProfanitySegments(List<TranscriptionSegment> segments) {
        List<TranscriptionSegment> filteredSegments = new ArrayList<>();
        for (TranscriptionSegment segment : segments) {
            if (!segment.getBadWordsList().isEmpty()) {
                filteredSegments.add(segment);
            }
        }
        return filteredSegments;
    }

    /**
     * 전체 텍스트를 구성하는 메서드
     *
     * @param segments 변환된 세그먼트 리스트
     * @return 전체 텍스트
     */
    private String buildTranscript(List<TranscriptionSegment> segments) {
        StringBuilder fullTranscript = new StringBuilder();
        for (TranscriptionSegment segment : segments) {
            fullTranscript.append(segment.getText()).append(" ");
        }
        return fullTranscript.toString().trim();
    }

    /**
     * 초 단위의 시간을 mm:ss 형식으로 변환하는 메서드
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
     * 텍스트에서 비속어를 검출하는 메서드
     *
     * @param transcript 텍스트
     * @return 비속어 리스트
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
}
