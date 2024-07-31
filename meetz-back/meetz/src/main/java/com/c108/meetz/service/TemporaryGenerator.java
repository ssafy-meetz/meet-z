package com.c108.meetz.service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;

public class TemporaryGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final int PASSWORD_LENGTH = 12;

    public static String generateTemporaryPassword() {
        byte[] bytes = new byte[PASSWORD_LENGTH-1];
        random.nextBytes(bytes);
        String encoded = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, PASSWORD_LENGTH-1) + "!";
        if (encoded.length() > PASSWORD_LENGTH) {
            return encoded.substring(0, PASSWORD_LENGTH);
        } else {
            return encoded;
        }
    }

    public static String generateTemporaryEmail() {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        return uuid + "@meetz.com";
    }
}
