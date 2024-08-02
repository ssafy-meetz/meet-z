package com.c108.meetz.api;

import java.util.List;

public class FanInformation {

    String email;
    List<String> startSessionList;
    int currentPosition;

    public FanInformation(String mail, List<String> starList, int i) {
        this.email = mail;
        this.startSessionList = starList;
        this.currentPosition = i;
    }
}
