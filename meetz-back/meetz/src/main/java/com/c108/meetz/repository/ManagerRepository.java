package com.c108.meetz.repository;

import com.c108.meetz.domain.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


public interface ManagerRepository extends JpaRepository<Manager, Integer> {

    Optional<Manager> findByEmail(String email);
    Boolean existsByToken(String token);

    @Transactional
    @Modifying
    @Query("update Manager m set m.token=NULL where m.token=:token")
    void upDateTokenToNull(String token);

    @Transactional
    @Modifying
    @Query("update Manager m set m.token=?2 where m.email=?1")
    void updateRefreshToken(String email, String refreshToken);



}
