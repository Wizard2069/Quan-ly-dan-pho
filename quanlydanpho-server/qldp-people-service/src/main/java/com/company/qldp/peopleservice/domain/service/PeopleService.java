package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.PeopleInfo;
import com.company.qldp.domain.*;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.domain.repository.PeopleSearchRepository;
import com.company.qldp.peopleservice.domain.dto.LeaveDto;
import com.company.qldp.peopleservice.domain.dto.PersonDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.userservice.domain.exception.UserNotFoundException;
import com.company.qldp.userservice.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;

@Service
public class PeopleService {
    
    private PeopleRepository peopleRepository;
    private UserRepository userRepository;
    private PeopleSearchRepository peopleSearchRepository;
    
    @Autowired
    public PeopleService(
        PeopleRepository peopleRepository,
        UserRepository userRepository,
        PeopleSearchRepository peopleSearchRepository
    ) {
        this.peopleRepository = peopleRepository;
        this.userRepository = userRepository;
        this.peopleSearchRepository = peopleSearchRepository;
    }
    
    public People createPeople(PersonDto personDto) {
        String createdManagerUsername = personDto.getCreatedManagerUsername();
        User createdManager = userRepository.findByUsername(createdManagerUsername);
        String peopleCode = RandomCodeGenerator.generateCode(8);
        
        if (createdManager == null) {
            throw new UserNotFoundException();
        }
        
        while (peopleCodeExists(peopleCode)) {
            peopleCode = RandomCodeGenerator.generateCode(12);
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
            .createdDate(Date.from(Instant.parse(personDto.getCreatedDate())))
            .note(personDto.getNote())
            .build();
        People savedPeople = peopleRepository.save(people);
    
        PeopleSearch peopleSearch = PeopleSearch.builder()
            .id(savedPeople.getId())
            .peopleCode(peopleCode)
            .birthday(savedPeople.getInfo().getBirthday())
            .currentAddress(personDto.getCurrentAddress())
            .fullName(personDto.getFullName())
            .job(personDto.getJob())
            .note(personDto.getNote())
            .sex(personDto.getSex())
            .passportNumber(personDto.getPassportNumber())
            .build();
        peopleSearchRepository.save(peopleSearch).subscribe();
        
        return savedPeople;
    }
    
    private boolean peopleCodeExists(String peopleCode) {
        return peopleRepository.findByPeopleCode(peopleCode) != null;
    }
    
    public People leavePeople(Integer id, LeaveDto leaveDto) {
        People people = peopleRepository.findById(id)
            .orElseThrow(PersonNotFoundException::new);
        
        PersonalMobilization mobilization = PersonalMobilization.builder()
            .leaveDate(Date.from(Instant.parse(leaveDto.getLeaveDate())))
            .leaveReason(leaveDto.getLeaveReason())
            .newAddress(leaveDto.getNewAddress())
            .build();
        people.setMobilization(mobilization);
        
        return peopleRepository.save(people);
    }
    
    @Transactional
    public People findPersonById(Integer id) {
        People person = peopleRepository.findById(id)
            .orElseThrow(PersonNotFoundException::new);
    
        if (person.getCreatedManager() != null) {
            person.getCreatedManager().getRoles().stream().count();
        }
        if (person.getDeletedManager() != null) {
            person.getDeletedManager().getRoles().stream().count();
        }
        if (person.getMobilization() != null) {
            person.getMobilization().getClass();
        }
        
        return person;
    }
}
