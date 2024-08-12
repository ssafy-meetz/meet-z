package com.c108.meetz.api;

import com.c108.meetz.dto.ApiResponse;
import com.c108.meetz.dto.response.BlackListInfoListResponseDto;
import com.c108.meetz.service.BlackListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public ApiResponse<BlackListInfoListResponseDto> getBlackListInfoList(){
        BlackListInfoListResponseDto response = blackListService.getBlackListInfoList();
        return ApiResponse.success(OK, response);
    }

    @DeleteMapping("/{blacklistId}")
    public ApiResponse<Void> deleteBlackList(@PathVariable int blacklistId){
        blackListService.deleteBlackList(blacklistId);
        return ApiResponse.success(OK);
    }
}
