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
        int centerX = (frameImage.getWidth() - origin.getWidth()) / 2;
        int centerY = (frameImage.getHeight() - origin.getHeight()) / 2;

        Graphics2D graphics = frameImage.createGraphics();
        graphics.drawImage(origin, centerX, centerY, null);
        graphics.dispose();

        return frameImage;
    }

}
