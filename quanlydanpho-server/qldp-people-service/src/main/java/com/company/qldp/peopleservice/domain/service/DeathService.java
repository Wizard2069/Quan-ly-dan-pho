package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.domain.Death;
import com.company.qldp.domain.People;
import com.company.qldp.domain.User;
import com.company.qldp.peopleservice.domain.dto.DeathDto;
import com.company.qldp.peopleservice.domain.exception.DeathAlreadyExistException;
import com.company.qldp.peopleservice.domain.exception.DeathNotFoundException;
import com.company.qldp.peopleservice.domain.exception.InvalidDateRangeException;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.DeathRepository;
import com.company.qldp.peopleservice.domain.repository.IDCardRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.util.DateUtils;
import com.company.qldp.userservice.domain.exception.UserNotFoundException;
import com.company.qldp.userservice.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class DeathService {
    
    private DeathRepository deathRepository;
    private IDCardRepository idCardRepository;
    private PeopleRepository peopleRepository;
    private UserRepository userRepository;
    
    @Autowired
    public DeathService(
        DeathRepository deathRepository,
        IDCardRepository idCardRepository,
        PeopleRepository peopleRepository,
        UserRepository userRepository
    ) {
        this.deathRepository = deathRepository;
        this.idCardRepository = idCardRepository;
        this.peopleRepository = peopleRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public Death createDeath(DeathDto deathDto) {
        String deathCertNumber = deathDto.getDeathCertNumber();
        String declaredPersonIDCardNumber = deathDto.getDeclaredPersonIdCardNumber();
        String deathPersonIDCardNumber = deathDto.getDeathPersonIdCardNumber();
        
        Death death = deathRepository.findByDeathCertNumber(deathCertNumber);
        People declaredPerson = idCardRepository.findByIdCardNumber(declaredPersonIDCardNumber)
            .getPerson();
        People deathPerson = idCardRepository.findByIdCardNumber(deathPersonIDCardNumber)
            .getPerson();
        
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
    
    @Transactional
    public Death getDeath(Integer id) {
        Death death = deathRepository.findById(id)
            .orElseThrow(DeathNotFoundException::new);
        
        death.getDeathPerson().hashCode();
        
        return death;
    }
    
    @Transactional
    public List<Death> getDeaths() {
        List<Death> deaths = deathRepository.findAll();
        deaths.forEach(death -> death.getDeathPerson().hashCode());
        
        return deaths;
    }
    
    @Transactional
    public List<Death> getDeathsByDateRange(String fromDateStr, String toDateStr) {
        Map<String, Date> dateRange = DateUtils.getDateRange(fromDateStr, toDateStr);
        Date from = dateRange.get("from");
        Date to = dateRange.get("to");
        
        List<Death> deaths = deathRepository.findAllByDeclaredDayBetween(from ,to);
        deaths.forEach(death -> death.getDeathPerson().hashCode());
        
        return deaths;
    }
}
