package com.company.qldp.householdservice.domain.service;

import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.exception.HouseholdNotFoundException;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class HouseholdService {
    
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public HouseholdService(
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository
    ) {
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
    }
    
    public Household createHousehold(HouseholdDto householdDto) {
        People host = peopleRepository.findById(householdDto.getHostPersonId())
            .orElseThrow(HouseholdNotFoundException::new);
        People performer = peopleRepository.findById(householdDto.getPerformerPersonId())
            .orElseThrow(HouseholdNotFoundException::new);
        
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
    
    @Transactional
    public Household getHousehold(Integer id) {
        Household household = householdRepository.findById(id)
            .orElseThrow(HouseholdNotFoundException::new);
        getHouseholdExtraInfo(household);
        
        return household;
    }
    
    @Transactional
    public List<Household> getHouseholds() {
        List<Household> households = householdRepository.findAll();
        households.forEach(this::getHouseholdExtraInfo);
        
        return households;
    }
    
    private void getHouseholdExtraInfo(Household household) {
        household.getHost().hashCode();
        household.getPerformer().hashCode();
    }
}
