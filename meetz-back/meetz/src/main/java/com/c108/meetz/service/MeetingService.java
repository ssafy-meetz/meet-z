package com.c108.meetz.service;

import com.c108.meetz.domain.Manager;
import com.c108.meetz.domain.Meeting;
import com.c108.meetz.dto.request.MeetingSaveRequestDto;
import com.c108.meetz.dto.response.MeetingSaveResponseDto;
import com.c108.meetz.exception.BadRequestException;
import com.c108.meetz.exception.NotFoundException;
import com.c108.meetz.repository.ManagerRepository;
import com.c108.meetz.repository.MeetingRepository;
import com.c108.meetz.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final ManagerRepository managerRepository;

    public MeetingSaveResponseDto saveMeeting(MeetingSaveRequestDto meetingSaveRequestDto) {

        Optional<Manager> manager = managerRepository.findByEmail(SecurityUtil.getCurrentUserEmail());
        if (manager.isEmpty()) {
            throw new NotFoundException("Manager not found");
        }
        Meeting meeting = meetingSaveRequestDto.toMeeting(manager.get());
        meetingRepository.save(meeting);

        return new MeetingSaveResponseDto(meeting.getMeetingId());
    }
}
