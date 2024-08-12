package com.c108.meetz.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.SdkClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3DownloadService {

    private final AmazonS3 s3Client;

    /**
     * S3에서 파일을 다운로드하여 HTTP 응답으로 반환하는 메서드.
     *
     * @param meetingId 미팅 ID를 사용하여 버킷 이름을 생성.
     * @param filePath  S3 내의 파일 경로.
     * @return 파일이 포함된 ResponseEntity 객체.
     */
    public ResponseEntity<ByteArrayResource> download(String meetingId, String filePath) {
        String bucketName = "meeting" + meetingId;

        try {
            // S3 버킷에서 파일 가져오기
            S3Object s3Object = s3Client.getObject(bucketName, filePath);
            InputStream inputStream = s3Object.getObjectContent();

            // InputStream을 바이트 배열로 변환
            byte[] fileBytes = inputStream.readAllBytes();

            // 파일명을 추출하여 Content-Disposition 헤더 설정
            String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

            // 응답 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            // 바이트 배열을 ByteArrayResource로 변환하여 반환
            ByteArrayResource resource = new ByteArrayResource(fileBytes);

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileBytes.length)
                    .body(resource);

        } catch (SdkClientException e) {
            log.error("S3와의 통신 중 오류가 발생했습니다.", e);
            throw new RuntimeException("S3와의 통신 중 오류가 발생했습니다.", e);
        } catch (IOException e) {
            log.error("파일 다운로드 중 오류가 발생했습니다.", e);
            throw new RuntimeException("파일 다운로드 중 오류가 발생했습니다.", e);
        }
    }
}
