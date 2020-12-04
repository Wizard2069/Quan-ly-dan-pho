package com.company.qldp.householdservice.domain.service;

import com.company.qldp.domain.FamilyMember;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.householdservice.domain.dto.FamilyMemberDto;
import com.company.qldp.householdservice.domain.exception.HouseholdNotFoundException;
import com.company.qldp.householdservice.domain.repository.FamilyMemberRepository;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FamilyMemberService {
    
    private FamilyMemberRepository familyMemberRepository;
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public FamilyMemberService(
        FamilyMemberRepository familyMemberRepository,
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository
    ) {
        this.familyMemberRepository = familyMemberRepository;
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
    }
    
    @Transactional
    public List<FamilyMember> addPeopleToHousehold(Integer householdId, FamilyMemberDto familyMemberDto) {
        List<FamilyMemberDto.Member> members = familyMemberDto.getMembers();
        
        Household household = householdRepository.findById(householdId)
            .orElseThrow(HouseholdNotFoundException::new);
        
        List<FamilyMember> familyMembers = new ArrayList<>();
        
        for (FamilyMemberDto.Member member : members) {
            People person = peopleRepository.findById(member.getId())
                .orElseThrow(PersonNotFoundException::new);
            
            FamilyMember familyMember = FamilyMember.builder()
                .person(person)
                .household(household)
                .hostRelation(member.getHostRelation())
                .build();
            FamilyMember savedMember = familyMemberRepository.save(familyMember);
            familyMembers.add(savedMember);
        }
        
        return familyMembers;
    }
}
