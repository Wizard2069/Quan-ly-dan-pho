package com.company.qldp.householdservice.domain.service;

import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.elasticsearchservice.domain.entity.HouseholdSearch;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.domain.repository.HouseholdSearchRepository;
import com.company.qldp.elasticsearchservice.domain.repository.PeopleSearchRepository;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.dto.LeaveHouseholdDto;
import com.company.qldp.householdservice.domain.exception.HouseholdNotFoundException;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.Date;

@Service
public class HouseholdService {
    
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    private HouseholdSearchRepository householdSearchRepository;
    private PeopleSearchRepository peopleSearchRepository;
    
    @Autowired
    public HouseholdService(
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository,
        HouseholdSearchRepository householdSearchRepository,
        PeopleSearchRepository peopleSearchRepository
    ) {
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
        this.householdSearchRepository = householdSearchRepository;
        this.peopleSearchRepository = peopleSearchRepository;
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
        
        Household savedHousehold = householdRepository.save(household);
    
        peopleSearchRepository.findById(householdDto.getHostPersonId())
            .map(peopleSearch -> {
                HouseholdSearch householdSearch = HouseholdSearch.builder()
                    .id(savedHousehold.getId())
                    .householdCode(savedHousehold.getHouseholdCode())
                    .host(peopleSearch)
                    .address(savedHousehold.getAddress())
                    .createdDay(savedHousehold.getCreatedDay())
                    .build();
                
                return householdSearchRepository.save(householdSearch);
            }).subscribe(Mono::subscribe);
            
        return savedHousehold;
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
    
    private void getHouseholdExtraInfo(Household household) {
        household.getHost().hashCode();
        household.getPerformer().hashCode();
    }
    
    @Transactional
    public Household leaveHousehold(Integer id, LeaveHouseholdDto leaveHouseholdDto) {
        Household household = householdRepository.findById(id)
            .orElseThrow(HouseholdNotFoundException::new);
        People performer = peopleRepository.findById(leaveHouseholdDto.getPerformerId())
            .orElseThrow(PersonNotFoundException::new);
        
        household.setLeaveDay(Date.from(Instant.parse(leaveHouseholdDto.getLeaveDate())));
        household.setLeaveReason(leaveHouseholdDto.getLeaveReason());
        household.setPerformer(performer);
        
        return householdRepository.save(household);
    }
}
