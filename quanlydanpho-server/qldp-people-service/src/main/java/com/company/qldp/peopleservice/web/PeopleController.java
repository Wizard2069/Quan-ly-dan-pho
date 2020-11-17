package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.People;
import com.company.qldp.peopleservice.domain.dto.PersonDto;
import com.company.qldp.peopleservice.domain.service.PeopleService;
import com.company.qldp.peopleservice.domain.util.CreatePersonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/api/manager",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class PeopleController {
    
    private PeopleService peopleService;
    
    @Autowired
    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }
    
    @PostMapping(
        path = "/people",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreatePersonResponse>> createPerson(@Valid PersonDto personDto) {
        People person = peopleService.createPeople(personDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreatePersonResponse(person.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreatePersonResponse makeCreatePersonResponse(Integer id) {
        return new CreatePersonResponse(id);
    }
}
