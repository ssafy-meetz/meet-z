package com.c108.meetz.repository;

import com.c108.meetz.domain.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlackListRepository extends JpaRepository<BlackList, Integer> {
    boolean existsByNameAndEmailAndPhoneAndManager_ManagerId(String name, String email, String phone, int managerId);

    List<BlackList> findByManager_ManagerId(int managerId);

}
