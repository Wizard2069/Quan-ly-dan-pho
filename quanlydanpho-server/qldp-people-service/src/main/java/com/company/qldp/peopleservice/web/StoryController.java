package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Family;
import com.company.qldp.domain.Story;
import com.company.qldp.peopleservice.domain.dto.FamilyDto;
import com.company.qldp.peopleservice.domain.dto.StoryDto;
import com.company.qldp.peopleservice.domain.service.StoryService;
import com.company.qldp.peopleservice.domain.util.AddFamilyRelationResponse;
import com.company.qldp.peopleservice.domain.util.CreateStoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static com.company.qldp.peopleservice.domain.util.AddFamilyRelationResponse.*;

@RestController
@RequestMapping(
    path = "/people",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class StoryController {
    
    private StoryService storyService;
    
    @Autowired
    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }
    
    @PostMapping(
        path = "/{id}/story",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateStoryResponse>> addPeopleStory(
        @PathVariable("id") Integer id,
        @Valid StoryDto storyDto
    ) {
        Story story = storyService.createStory(id, storyDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateStoryResponse(story),
            HttpStatus.CREATED
        ));
    }
    
    private CreateStoryResponse makeCreateStoryResponse(Story story) {
        return CreateStoryResponse.builder()
            .id(story.getId())
            .personId(story.getPerson().getId())
            .address(story.getAddress())
            .from(story.getInterval().getFrom())
            .to(story.getInterval().getTo())
            .job(story.getJob())
            .workplace(story.getWorkplace())
            .build();
    }
    
    @PostMapping(
        path = "/{id}/family",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Mono<ResponseEntity<AddFamilyRelationResponse>> addFamilyRelation(
        @PathVariable("id") Integer id,
        @Valid @RequestBody FamilyDto familyDto
    ) {
        List<Family> familyList = storyService.addFamilyRelationToPeople(id, familyDto);
        
        return Mono.just(new ResponseEntity<>(
            makeAddFamilyRelationResponse(familyList),
            HttpStatus.CREATED
        ));
    }
    
    private AddFamilyRelationResponse makeAddFamilyRelationResponse(List<Family> familyList) {
        List<Relation> relations = new ArrayList<>();
        
        for (Family family : familyList) {
            Relation relation = Relation.builder()
                .peopleId(family.getPerson().getId())
                .peopleRelation(family.getPersonRelation())
                .build();
            relations.add(relation);
        }
        
        return new AddFamilyRelationResponse(relations);
    }
}
