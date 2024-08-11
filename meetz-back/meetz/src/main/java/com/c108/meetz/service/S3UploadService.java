package com.c108.meetz.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.SdkClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * S3UploadService는 파일을 AWS S3 버킷에 업로드하는 서비스.
 * S3 클라이언트를 사용하여 파일 업로드 및 버킷 생성 등의 작업을 수행.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class S3UploadService {

    // AWS S3 클라이언트
    private final AmazonS3 s3Client;

    /**
     * 파일을 지정된 S3 버킷에 업로드하는 메서드.
     * @param file       업로드할 파일
     * @param bucketName 업로드할 S3 버킷 이름
     * @param filePath   S3 버킷 내에서 파일이 저장될 경로
     * @return           업로드된 파일의 URL
     */
    public String upload(MultipartFile file, String bucketName, String filePath) {
        try {
            // 버킷 이름 출력 (디버깅용)
            log.debug("bucketName : {}", bucketName);

            // 버킷이 존재하지 않으면 생성
            if (!s3Client.doesBucketExistV2(bucketName)) {
                // 버킷 생성
                CreateBucketRequest createBucketRequest = new CreateBucketRequest(bucketName);
                Bucket bucket = s3Client.createBucket(createBucketRequest);
                // 퍼블릭 읽기 권한 설정
                s3Client.setBucketAcl(bucketName, CannedAccessControlList.PublicRead);
                log.debug("버킷 생성 및 퍼블릭 접근 권한 설정 완료: {}", bucketName);
            }

            // 파일 메타데이터 설정
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            // S3에 파일 업로드 요청 생성 및 퍼블릭 읽기 권한 설정
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filePath, file.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);  // 파일에 퍼블릭 읽기 권한 부여
            s3Client.putObject(putObjectRequest);

            // 파일 업로드 완료 메시지 출력 (디버깅용)
            log.debug("파일 업로드 완료: {}/{}", bucketName, filePath);

            // 파일의 S3 URL 생성 및 반환
            String url = String.format("https://kr.object.ncloudstorage.com/%s/%s", bucketName, filePath);
            return url;

        } catch (SdkClientException e) {
            // S3와의 통신 중 발생한 예외 처리
            log.error("S3와의 통신 중 오류가 발생했습니다.", e);
            throw new RuntimeException("S3와의 통신 중 오류가 발생했습니다.", e);
        } catch (IOException e) {
            // 파일 업로드 중 발생한 예외 처리
            log.error("파일 업로드 중 오류가 발생했습니다.", e);
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
        }
    }
}
