package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Story;
import com.company.qldp.peopleservice.domain.dto.StoryDto;
import com.company.qldp.peopleservice.domain.service.StoryService;
import com.company.qldp.peopleservice.domain.util.CreateStoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

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
}
