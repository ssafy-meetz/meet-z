package com.c108.meetz.service;

import java.util.HashSet;
import java.util.List;

import com.c108.meetz.domain.BadWord;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BadWordsFilteringService extends HashSet<String> {

    private String substituteValue = "*";

    public BadWordsFilteringService() {
        addAll(List.of(BadWord.KOREAN_BAD_WORDS));
    }

    public BadWordsFilteringService(String substituteValue) {
        this.substituteValue = substituteValue;
        addAll(List.of(BadWord.KOREAN_BAD_WORDS));
    }

    // 비속어가 있다면 대체하는 기능
    public String change(String text) {
        String[] words = stream().filter(text::contains).toArray(String[]::new);
        for (String v : words) {
            String sub = this.substituteValue.repeat(v.length());
            text = text.replace(v, sub);
        }
        return text;
    }

    // 비속어가 1개라도 존재하면 true 반환
    public boolean check(String text) {
        return stream().anyMatch(text::contains);
    }
}
