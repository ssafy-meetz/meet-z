package com.c108.meetz.repository;

import com.c108.meetz.domain.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlackListRepository extends JpaRepository<BlackList, Integer> {

    // 이름, 전화번호, 매니저 ID로 블랙리스트 존재 여부 확인
    boolean existsByNameAndPhoneAndManager_ManagerId(String name, String phone, int managerId);

    // 매니저 ID로 블랙리스트 조회
    List<BlackList> findByManager_ManagerId(int managerId);
}
