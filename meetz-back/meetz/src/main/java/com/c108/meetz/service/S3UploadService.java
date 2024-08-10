package com.c108.meetz.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.SdkClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3UploadService {

    private final AmazonS3 s3Client;

    public String upload(MultipartFile file, String meetingId, String filePath) {
        try {
            String bucketName = "meeting" + meetingId;

            if (!s3Client.doesBucketExistV2(bucketName)) {
                s3Client.createBucket(bucketName);
                log.debug("버킷 생성 완료: {}", bucketName);
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filePath, file.getInputStream(), metadata);
            s3Client.putObject(putObjectRequest);

            log.debug("파일 업로드 완료: {}/{}", bucketName, filePath);

            // 직접 URL 생성
            String url = String.format("https://kr.object.ncloudstorage.com/%s/%s", bucketName, filePath);
            return url;

        } catch (SdkClientException e) {
            log.error("S3와의 통신 중 오류가 발생했습니다.", e);
            throw new RuntimeException("S3와의 통신 중 오류가 발생했습니다.", e);
        } catch (IOException e) {
            log.error("파일 업로드 중 오류가 발생했습니다.", e);
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
        }
    }


}