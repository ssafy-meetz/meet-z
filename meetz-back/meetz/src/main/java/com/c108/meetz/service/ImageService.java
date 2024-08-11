package com.c108.meetz.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ImageService {

    public BufferedImage mergeImage(MultipartFile originImage, int frameType) throws IOException {
        ClassPathResource frameImageResource;
        if(frameType==1){
            frameImageResource = new ClassPathResource("frame1.jpg");
        }
        else if(frameType==2){
            frameImageResource = new ClassPathResource("frame2.jpg");
        }
        else{
            frameImageResource = new ClassPathResource("frame3.jpg");
        }
        InputStream frameImageStream = frameImageResource.getInputStream();
        BufferedImage frameImage = ImageIO.read(frameImageStream);
        BufferedImage origin = ImageIO.read(originImage.getInputStream());

        // 원본 이미지 리사이징 (846 * 317 픽셀)
        int targetWidth = 846;
        int targetHeight = 317;
        BufferedImage resizedOrigin = resizeImage(origin, targetWidth, targetHeight);
        int centerX = (frameImage.getWidth() - resizedOrigin.getWidth()) / 2;
        int centerY = (frameImage.getHeight() - resizedOrigin.getHeight()) / 2;

        Graphics2D graphics = frameImage.createGraphics();
        graphics.drawImage(resizedOrigin, centerX, centerY, null);
        graphics.dispose();

        return frameImage;
    }

    // 이미지 리사이징 메서드
    private BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, originalImage.getType());
        Graphics2D g = resizedImage.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g.dispose();
        return resizedImage;
    }

}
