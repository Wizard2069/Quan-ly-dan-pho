package com.company.qldp.householdservice.domain.service;

import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class HouseholdService {
    
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public HouseholdService(HouseholdRepository householdRepository, PeopleRepository peopleRepository) {
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
    }
    
    public Household createHousehold(HouseholdDto householdDto) {
        String peopleCode = householdDto.getHostPeopleCode();
        People people = peopleRepository.findByPeopleCode(peopleCode);
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
        
        Household household = Household.builder()
            .householdCode(householdDto.getHouseholdCode())
            .host(people)
            .areaCode(householdDto.getAreaCode())
            .address(householdDto.getAddress())
            .createdDay(Date.from(Instant.parse(householdDto.getCreatedDay())))
            .build();
        
        return householdRepository.save(household);
    }
}
