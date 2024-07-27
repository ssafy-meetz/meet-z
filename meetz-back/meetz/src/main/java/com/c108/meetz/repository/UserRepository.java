package com.c108.meetz.repository;

import com.c108.meetz.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("update User u set u.token=?2 where u.email=?1")
    void updateRefreshToken(String email, String refreshToken);

    Boolean existsByToken(String token);
}
