package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Family;
import com.company.qldp.domain.Story;
import com.company.qldp.peopleservice.domain.assembler.StoryRepresentationModelAssembler;
import com.company.qldp.peopleservice.domain.dto.FamilyDto;
import com.company.qldp.peopleservice.domain.dto.StoryDto;
import com.company.qldp.peopleservice.domain.service.StoryService;
import com.company.qldp.peopleservice.domain.util.AddFamilyRelationResponse;
import com.company.qldp.peopleservice.domain.util.CreateStoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static com.company.qldp.peopleservice.domain.util.AddFamilyRelationResponse.*;

@RestController
@RequestMapping(
    path = "/people",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class StoryController {
    
    private StoryService storyService;
    
    private StoryRepresentationModelAssembler assembler;
    
    @Autowired
    public StoryController(
        StoryService storyService,
        StoryRepresentationModelAssembler assembler
    ) {
        this.storyService = storyService;
        this.assembler = assembler;
    }
    
    @PostMapping(
        path = "/{id}/stories",
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
                .id(family.getId())
                .peopleRelation(family.getPersonRelation())
                .build();
            relations.add(relation);
        }
        
        return new AddFamilyRelationResponse(relations);
    }
    
    @GetMapping(path = "/{id}/stories")
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<CollectionModel<EntityModel<Story>>> getStoriesByPeopleId(
        @PathVariable("id") Integer id,
        ServerWebExchange exchange
    ) {
        List<Story> stories = storyService.getStoriesByPeopleId(id);
        
        return assembler.toCollectionModel(Flux.fromIterable(stories), exchange);
    }
    
    @GetMapping(path = "/{id}/stories/{storyId}")
    public Mono<EntityModel<Story>> getStoryById(
        @PathVariable("id") Integer peopleId,
        @PathVariable("storyId") Integer storyId,
        ServerWebExchange exchange
    ) {
        Story story = storyService.getStoryById(peopleId, storyId);
        
        return assembler.toModel(story, exchange);
    }
}
