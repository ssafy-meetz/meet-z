package com.c108.meetz.repository;

import com.c108.meetz.domain.Role;
import com.c108.meetz.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);

    Boolean existsByToken(String token);

    List<User> findByMeeting_MeetingIdAndRole(int meetingId, Role role);

    Optional<User> findByEmailAndMeeting_MeetingId(String email, int meetingId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.nickname = :nickname WHERE u.userId = :userId")
    void updateNickname(@Param("userId") int userId, @Param("nickname") String nickname);
    
}
