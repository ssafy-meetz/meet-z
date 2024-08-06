package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.service.BlackListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/blacklist")
public class BlackListApi {

    private final BlackListService blackListService;

    @PostMapping("/{userId}")
    public ApiResponse<Void> saveBlackList(@PathVariable int userId){
        blackListService.saveBlackList(userId);
        return ApiResponse.success(OK);
    }
}
