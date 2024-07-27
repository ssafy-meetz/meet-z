package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.domain.User;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.MeetingSaveResponseDto;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.exception.UnauthorizedException;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.repository.UserRepository;
import com.c108.meetz.util.SecurityUtil;
import com.c108.meetz.dto.request.FanSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final ManagerRepository managerRepository;
    private final UserRepository userRepository;

    public MeetingSaveResponseDto saveMeeting(MeetingSaveRequestDto meetingSaveRequestDto) {
        if(!SecurityUtil.getCurrentUserRole().equals("MANAGER")){
            throw new UnauthorizedException("접근 권한이 없습니다.");
        }
        Optional<Manager> manager = managerRepository.findByEmail(SecurityUtil.getCurrentUserEmail());
        if (manager.isEmpty()) {
            throw new NotFoundException("Manager not found");
        }
        Meeting meeting = meetingSaveRequestDto.toMeeting(manager.get());
        meeting.setMeetingEnd(calculateMeetingEnd(meetingSaveRequestDto));
        meetingRepository.save(meeting);

        List<User> stars = meetingSaveRequestDto.getStarList().stream()
                .map(starSaveDto -> starSaveDto.toUser(meeting))
                .collect(Collectors.toList());
        userRepository.saveAll(stars);

        List<User> fans = meetingSaveRequestDto.getFanList().stream()
                .map(fanSaveDto -> fanSaveDto.toUser(meeting))
                .collect(Collectors.toList());
        userRepository.saveAll(fans);

        return new MeetingSaveResponseDto(meeting.getMeetingId());
    }

    private LocalDateTime calculateMeetingEnd(MeetingSaveRequestDto meeting) {
        int singleFanMeetingTime = (meeting.getMeetingDuration() + meeting.getTerm()) * meeting.getStarList().size() - meeting.getTerm();
        int totalFanMeetingTime = singleFanMeetingTime * meeting.getFanList().size();
        return meeting.getMeetingStart().plusSeconds(totalFanMeetingTime);
    }

}
