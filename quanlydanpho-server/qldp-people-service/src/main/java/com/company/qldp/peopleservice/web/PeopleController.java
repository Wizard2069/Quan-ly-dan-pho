package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Death;
import com.company.qldp.domain.IDCard;
import com.company.qldp.domain.People;
import com.company.qldp.peopleservice.domain.assembler.PeopleRepresentationModelAssembler;
import com.company.qldp.peopleservice.domain.dto.DeathDto;
import com.company.qldp.peopleservice.domain.dto.IDCardDto;
import com.company.qldp.peopleservice.domain.dto.LeaveDto;
import com.company.qldp.peopleservice.domain.dto.PersonDto;
import com.company.qldp.peopleservice.domain.service.PeopleService;
import com.company.qldp.peopleservice.domain.util.CreateIDCardResponse;
import com.company.qldp.peopleservice.domain.util.DeathPersonResponse;
import com.company.qldp.peopleservice.domain.util.LeavePersonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/people",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class PeopleController {
    
    private PeopleService peopleService;
    
    private PeopleRepresentationModelAssembler assembler;
    
    @Autowired
    public PeopleController(
        PeopleService peopleService,
        PeopleRepresentationModelAssembler assembler
    ) {
        this.peopleService = peopleService;
        this.assembler = assembler;
    }
    
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<ResponseEntity<EntityModel<People>>> createPerson(
        @Valid PersonDto personDto,
        ServerWebExchange exchange
    ) {
        People person = peopleService.createPeople(personDto);
        
        return assembler.toModel(person, exchange)
            .map(peopleModel -> ResponseEntity
                .created(peopleModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(peopleModel)
            );
    }
    
    @PatchMapping(
        path = "/death",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<DeathPersonResponse>> declareDeathPerson(@Valid DeathDto deathDto) {
        Death death = peopleService.deleteDeathPeople(deathDto);
        
        return Mono.just(new ResponseEntity<>(
            makeDeathPersonResponse(death.getId()),
            HttpStatus.OK
        ));
    }
    
    private DeathPersonResponse makeDeathPersonResponse(Integer id) {
        return new DeathPersonResponse(id);
    }
    
    @PatchMapping(
        path = "/leave",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<LeavePersonResponse>> leavePerson(@Valid LeaveDto leaveDto) {
        People people = peopleService.leavePeople(leaveDto);
        
        return Mono.just(new ResponseEntity<>(
            makeLeavePersonResponse(people.getId()),
            HttpStatus.OK
        ));
    }
    
    private LeavePersonResponse makeLeavePersonResponse(Integer id) {
        return new LeavePersonResponse(id);
    }
    
    @PostMapping(
        path = "/id-card",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateIDCardResponse>> createIDCard(@Valid IDCardDto idCardDto) {
        IDCard idCard = peopleService.createPeopleIDCard(idCardDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateIDCardResponse(idCard.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreateIDCardResponse makeCreateIDCardResponse(Integer id) {
        return new CreateIDCardResponse(id);
    }
    
    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<EntityModel<People>> getPersonById(
        @PathVariable("id") Integer id,
        ServerWebExchange exchange
    ) {
        People person = peopleService.findPersonById(id);
        
        return assembler.toModel(person, exchange);
    }
}
