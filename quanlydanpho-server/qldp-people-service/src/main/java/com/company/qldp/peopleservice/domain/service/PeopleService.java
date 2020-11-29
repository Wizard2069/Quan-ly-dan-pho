package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.PeopleInfo;
import com.company.qldp.domain.*;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.domain.repository.PeopleSearchRepository;
import com.company.qldp.peopleservice.domain.dto.DeathDto;
import com.company.qldp.peopleservice.domain.dto.IDCardDto;
import com.company.qldp.peopleservice.domain.dto.LeaveDto;
import com.company.qldp.peopleservice.domain.dto.PersonDto;
import com.company.qldp.peopleservice.domain.exception.DeathAlreadyExistException;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.DeathRepository;
import com.company.qldp.peopleservice.domain.repository.IDCardRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.common.util.RandomCodeGenerator;
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
    private DeathRepository deathRepository;
    private PeopleSearchRepository peopleSearchRepository;
    private IDCardRepository idCardRepository;
    
    @Autowired
    public PeopleService(
        PeopleRepository peopleRepository,
        UserRepository userRepository,
        DeathRepository deathRepository,
        PeopleSearchRepository peopleSearchRepository,
        IDCardRepository idCardRepository
    ) {
        this.peopleRepository = peopleRepository;
        this.userRepository = userRepository;
        this.deathRepository = deathRepository;
        this.peopleSearchRepository = peopleSearchRepository;
        this.idCardRepository = idCardRepository;
    }
    
    public People createPeople(PersonDto personDto) {
        String createdManagerUsername = personDto.getCreatedManagerUsername();
        User createdManager = userRepository.findByUsername(createdManagerUsername);
        String peopleCode = RandomCodeGenerator.generateCode(8);
        
        if (createdManager == null) {
            throw new UserNotFoundException();
        }
        
        while (peopleCodeExists(peopleCode)) {
            peopleCode = RandomCodeGenerator.generateCode(8);
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
            .birthday(Date.from(Instant.parse(personDto.getBirthday())))
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
    
    public Death deleteDeathPeople(DeathDto deathDto) {
        String deathCertNumber = deathDto.getDeathCertNumber();
        String declaredPersonCode = deathDto.getDeclaredPersonCode();
        String deathPersonCode = deathDto.getDeathPersonCode();
        
        Death death = deathRepository.findByDeathCertNumber(deathCertNumber);
        People declaredPerson = peopleRepository.findByPeopleCode(declaredPersonCode);
        People deathPerson = peopleRepository.findByPeopleCode(deathPersonCode);
        
        if (death != null) {
            throw new DeathAlreadyExistException();
        }
        if (declaredPerson == null || deathPerson == null) {
            throw new PersonNotFoundException();
        }
        
        User deletedManager = userRepository.findByUsername(deathDto.getDeletedManagerUsername());
        if (deletedManager == null) {
            throw new UserNotFoundException();
        }
        
        deathPerson.setDeletedDate(new Date());
        deathPerson.setDeletedManager(deletedManager);
        deathPerson.setDeletedReason("death");
        peopleRepository.save(deathPerson);
        
        Death createdDeath = Death.builder()
            .deathCertNumber(deathDto.getDeathCertNumber())
            .declaredPerson(declaredPerson)
            .deathPerson(deathPerson)
            .declaredDay(Date.from(Instant.parse(deathDto.getDeclaredDay())))
            .deathDay(Date.from(Instant.parse(deathDto.getDeathDay())))
            .deathReason(deathDto.getDeathReason())
            .build();
        
        return deathRepository.save(createdDeath);
    }
    
    public People leavePeople(LeaveDto leaveDto) {
        People people = peopleRepository.findByPeopleCode(leaveDto.getPeopleCode());
        if (people == null) {
            throw new PersonNotFoundException();
        }
    
        PersonalMobilization mobilization = PersonalMobilization.builder()
            .leaveDate(Date.from(Instant.parse(leaveDto.getLeaveDate())))
            .leaveReason(leaveDto.getLeaveReason())
            .newAddress(leaveDto.getNewAddress())
            .build();
        people.setMobilization(mobilization);
        
        return peopleRepository.save(people);
    }
    
    public IDCard createPeopleIDCard(IDCardDto idCardDto) {
        People people = peopleRepository.findByPeopleCode(idCardDto.getPeopleCode());
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
        
        IDCard idCard = IDCard.builder()
            .person(people)
            .idCardNumber(idCardDto.getIdCardNumber())
            .issuedDay(Date.from(Instant.parse(idCardDto.getIssuedDay())))
            .issuedPlace(idCardDto.getIssuedPlace())
            .build();
        
        return idCardRepository.save(idCard);
    }
}
