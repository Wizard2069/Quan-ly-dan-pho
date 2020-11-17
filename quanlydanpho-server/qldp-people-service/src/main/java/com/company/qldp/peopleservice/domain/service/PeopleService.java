package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.PeopleInfo;
import com.company.qldp.domain.People;
import com.company.qldp.domain.PersonalExtraInfo;
import com.company.qldp.domain.User;
import com.company.qldp.peopleservice.domain.dto.PersonDto;
import com.company.qldp.peopleservice.domain.exception.PersonAlreadyExistException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.userservice.domain.exception.UserNotFoundException;
import com.company.qldp.userservice.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class PeopleService {
    
    private PeopleRepository peopleRepository;
    private UserRepository userRepository;
    
    @Autowired
    public PeopleService(PeopleRepository peopleRepository, UserRepository userRepository) {
        this.peopleRepository = peopleRepository;
        this.userRepository = userRepository;
    }
    
    public People createPeople(PersonDto personDto) {
        String peopleCode = personDto.getPeopleCode();
        
        if (peopleCodeExist(peopleCode)) {
            throw new PersonAlreadyExistException();
        }
        
        String createdManagerUsername = personDto.getCreatedManagerUsername();
        User createdManager = userRepository.findByUsername(createdManagerUsername);
        
        if (createdManager == null) {
            throw new UserNotFoundException();
        }
        
        PeopleInfo peopleInfo = PeopleInfo.builder()
            .fullName(personDto.getFullName())
            .birthday(Date.from(Instant.parse(personDto.getBirthday())))
            .sex(personDto.getSex())
            .job(personDto.getJob())
            .currentAddress(personDto.getCurrentAddress())
            .build();
    
        PersonalExtraInfo extraInfo = PersonalExtraInfo.builder()
            .domicile(personDto.getDomicile())
            .nation(personDto.getNation())
            .religion(personDto.getReligion())
            .nationality(personDto.getNationality())
            .build();
        
        People people = People.builder()
            .peopleCode(peopleCode)
            .alias(personDto.getAlias())
            .info(peopleInfo)
            .birthPlace(personDto.getBirthPlace())
            .extraInfo(extraInfo)
            .passportNumber(personDto.getPassportNumber())
            .permanentAddress(personDto.getPermanentAddress())
            .createdManager(createdManager)
            .createdDate(Date.from(Instant.from(Instant.parse(personDto.getCreatedDate()))))
            .note(personDto.getNote())
            .build();
        
        return peopleRepository.save(people);
    }
    
    private boolean peopleCodeExist(String peopleCode) {
        return peopleRepository.findByPeopleCode(peopleCode) != null;
    }
}
