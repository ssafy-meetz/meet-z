package com.c108.meetz.repository;

import com.c108.meetz.domain.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackListRepository extends JpaRepository<BlackList, Integer> {
    boolean existsByNameAndEmailAndPhone(String name, String email, String phone);
}
