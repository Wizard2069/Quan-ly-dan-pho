package com.company.qldp.householdservice.domain.service;

import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.repository.FamilyMemberRepository;
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
    private FamilyMemberRepository familyMemberRepository;
    
    @Autowired
    public HouseholdService(
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository,
        FamilyMemberRepository familyMemberRepository
    ) {
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
        this.familyMemberRepository = familyMemberRepository;
    }
    
    public Household createHousehold(HouseholdDto householdDto) {
        People host = peopleRepository.findByPeopleCode(householdDto.getHostPersonCode());
        People performer = peopleRepository.findByPeopleCode(householdDto.getPerformerPersonCode());
        
        if (host == null || performer == null) {
            throw new PersonNotFoundException();
        }
        
        String code = "24" + RandomCodeGenerator.generateCode(7);
        while (householdCodeExists(code)) {
            code = "24" + RandomCodeGenerator.generateCode(7);
        }
        
        Household household = Household.builder()
            .householdCode(code)
            .host(host)
            .performer(performer)
            .areaCode(householdDto.getAreaCode())
            .address(householdDto.getAddress())
            .createdDay(Date.from(Instant.parse(householdDto.getCreatedDay())))
            .build();
        
        return householdRepository.save(household);
    }
    
    private boolean householdCodeExists(String code) {
        return householdRepository.findByHouseholdCode(code) != null;
    }
}
