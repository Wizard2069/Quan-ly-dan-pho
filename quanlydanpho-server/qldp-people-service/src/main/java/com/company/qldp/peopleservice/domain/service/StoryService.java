package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.PeopleInfo;
import com.company.qldp.domain.Family;
import com.company.qldp.domain.People;
import com.company.qldp.domain.Story;
import com.company.qldp.peopleservice.domain.dto.FamilyDto;
import com.company.qldp.peopleservice.domain.dto.StoryDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.FamilyRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.repository.StoryRepository;
import com.company.qldp.peopleservice.domain.util.CreateDateInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.company.qldp.peopleservice.domain.dto.FamilyDto.*;

@Service
public class StoryService {
    
    private StoryRepository storyRepository;
    private PeopleRepository peopleRepository;
    private FamilyRepository familyRepository;
    
    @Autowired
    public StoryService(
        StoryRepository storyRepository,
        PeopleRepository peopleRepository,
        FamilyRepository familyRepository
    ) {
        this.storyRepository = storyRepository;
        this.peopleRepository = peopleRepository;
        this.familyRepository = familyRepository;
    }
    
    public Story createStory(Integer id, StoryDto storyDto) {
        People person = peopleRepository.findById(id)
            .orElseThrow(PersonNotFoundException::new);
    
        DateInterval interval = CreateDateInterval.create(
            storyDto.getFromDate(),
            storyDto.getToDate()
        );
        
        Story story = Story.builder()
            .person(person)
            .interval(interval)
            .address(storyDto.getAddress())
            .job(storyDto.getJob())
            .workplace(storyDto.getWorkplace())
            .build();
        
        return storyRepository.save(story);
    }
    
    public List<Family> addFamilyRelationToPeople(Integer id, FamilyDto familyDto) {
        People person = peopleRepository.findById(id)
            .orElseThrow(PersonNotFoundException::new);
        
        List<MemberRelation> relations = familyDto.getRelations();
        List<Family> familyList = new ArrayList<>();
        
        for (MemberRelation relation : relations) {
            People member = peopleRepository.findById(relation.getMemberId())
                .orElseThrow(PersonNotFoundException::new);
            
            Family family = Family.builder()
                .person(person)
                .info(member.getInfo())
                .personRelation(relation.getMemberRelation())
                .build();
            
            Family savedFamily = familyRepository.save(family);
            familyList.add(savedFamily);
        }
        
        return familyList;
    }
}
