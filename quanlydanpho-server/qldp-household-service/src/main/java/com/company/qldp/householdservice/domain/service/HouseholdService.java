package com.company.qldp.householdservice.domain.service;

import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.FamilyMember;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.elasticsearchservice.domain.entity.HouseholdSearch;
import com.company.qldp.elasticsearchservice.domain.repository.HouseholdSearchRepository;
import com.company.qldp.elasticsearchservice.domain.repository.PeopleSearchRepository;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.dto.LeaveHouseholdDto;
import com.company.qldp.householdservice.domain.dto.SeparateHouseholdDto;
import com.company.qldp.householdservice.domain.exception.HouseholdNotFoundException;
import com.company.qldp.householdservice.domain.repository.FamilyMemberRepository;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.company.qldp.householdservice.domain.dto.SeparateHouseholdDto.*;

@Service
public class HouseholdService {
    
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    private HouseholdSearchRepository householdSearchRepository;
    private PeopleSearchRepository peopleSearchRepository;
    private FamilyMemberRepository familyMemberRepository;
    
    @Autowired
    public HouseholdService(
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository,
        HouseholdSearchRepository householdSearchRepository,
        PeopleSearchRepository peopleSearchRepository,
        FamilyMemberRepository familyMemberRepository
    ) {
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
        this.householdSearchRepository = householdSearchRepository;
        this.peopleSearchRepository = peopleSearchRepository;
        this.familyMemberRepository = familyMemberRepository;
    }
    
    public Household createHousehold(HouseholdDto householdDto) {
        People host = peopleRepository.findById(householdDto.getHostPersonId())
            .orElseThrow(HouseholdNotFoundException::new);
        People performer = peopleRepository.findById(householdDto.getPerformerPersonId())
            .orElseThrow(HouseholdNotFoundException::new);
        
        String code = generateHouseholdCode();
        
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
    
    @Transactional
    public Household separateHousehold(Integer id, SeparateHouseholdDto separateHouseholdDto) {
        People host = peopleRepository.findById(separateHouseholdDto.getHostId())
            .orElseThrow(PersonNotFoundException::new);
        People performer = peopleRepository.findById(separateHouseholdDto.getPerformerId())
            .orElseThrow(PersonNotFoundException::new);
        
        List<FamilyMember> members = familyMemberRepository.findAllByHousehold_Id(id);
        members = members.stream()
            .filter(member -> !member.getPerson().getId().equals(host.getId()))
            .collect(Collectors.toList());
        familyMemberRepository.saveAll(members);
        host.setPermanentAddress(separateHouseholdDto.getNewAddress());
        peopleRepository.save(host);
        
        String code = generateHouseholdCode();
        
        Household newHousehold = Household.builder()
            .householdCode(code)
            .host(host)
            .address(separateHouseholdDto.getNewAddress())
            .createdDay(Date.from(Instant.parse(separateHouseholdDto.getCreatedDay())))
            .areaCode(separateHouseholdDto.getAreaCode())
            .performer(performer)
            .build();
        Household savedHousehold = householdRepository.save(newHousehold);
        
        peopleSearchRepository.findById(host.getId()).map(peopleSearch -> {
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
    
    private String generateHouseholdCode() {
        String code = "24" + RandomCodeGenerator.generateCode(7);
        while (householdCodeExists(code)) {
            code = "24" + RandomCodeGenerator.generateCode(7);
        }
        
        return code;
    }
    
    private boolean householdCodeExists(String code) {
        return householdRepository.findByHouseholdCode(code) != null;
    }
}
