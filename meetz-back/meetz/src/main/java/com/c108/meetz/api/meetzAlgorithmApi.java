package com.c108.meetz.api;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class meetzAlgorithmApi {

    public static void main(String[] args) throws IOException{
        Queue<int[]> que = new ArrayDeque<>();

        //팬 리스트
        List<String> starList = new ArrayList<>();
        starList.add("star1");
        starList.add("star2");
        starList.add("star3");
        //스타 리스트
        List<FanInformation> fanList = new ArrayList<FanInformation>();
        /*
        String email;
        List<String> startSessionList;
        int currentPosition;
         */
        fanList.add(new FanInformation("팬1", starList, 0));
        fanList.add(new FanInformation("팬2", starList, 0));
        fanList.add(new FanInformation("팬3", starList, 0));
        fanList.add(new FanInformation("팬4", starList, 0));
        fanList.add(new FanInformation("팬5", starList, 0));
        fanList.add(new FanInformation("팬6", starList, 0));

        int totalPhases = fanList.size() + starList.size() - 1;

        for (int phase = 0; phase < totalPhases; phase++) {
            System.out.println("===================== Phase" + phase + " =====================");

            int startFan = Math.max(0, phase - starList.size() + 1); //팬의 시작
            int endFan = Math.min(phase, fanList.size() - 1); //팬의 끝

            for (int fanIndex = startFan; fanIndex <= endFan; fanIndex++) {
                FanInformation fan = fanList.get(fanIndex); //펜의 인덱스
                int starIndex = phase - fanIndex; //스타의 인덱스 = 현재 단계 - 팬의 윛

                if (starIndex < starList.size()) {
                    fan.currentPosition = starIndex + 1;
                    System.out.println("팬: " + (fanIndex + 1) + ", 아이돌: " + fan.currentPosition);
                }
            }

        }


//
//        while (!que.isEmpty()) {
//            int[] cur = que.poll();
//            System.out.println("팬: " + cur[0] + ", 아이돌:" + cur[1]);
//        }


        //보내질 정보
//        SessionResponseDto sessionResponseDto = new SessionResponseDto("승원",
//                180,
//                "승팬싸");
//



    }

}
