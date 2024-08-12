package com.c108.meetz.util;

import lombok.NoArgsConstructor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@NoArgsConstructor
public class InputStreamToFileConverter {


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
