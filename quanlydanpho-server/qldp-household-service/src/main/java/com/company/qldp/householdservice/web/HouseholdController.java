package com.company.qldp.householdservice.web;

import com.company.qldp.domain.Household;
import com.company.qldp.householdservice.domain.assembler.HouseholdRepresentationModelAssembler;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.service.HouseholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(
    path = "/households",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class HouseholdController {
    
    private HouseholdService householdService;
    
    private HouseholdRepresentationModelAssembler assembler;
    
    @Autowired
    public HouseholdController(
        HouseholdService householdService,
        HouseholdRepresentationModelAssembler assembler
    ) {
        this.householdService = householdService;
        this.assembler = assembler;
    }
    
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<ResponseEntity<EntityModel<Household>>> createHousehold(
        @Valid HouseholdDto householdDto,
        ServerWebExchange exchange
    ) {
        Household household = householdService.createHousehold(householdDto);
        
        return assembler.toModel(household, exchange)
            .map(householdModel -> ResponseEntity
                .created(householdModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(householdModel)
            );
    }
    
    @GetMapping(path = "/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<EntityModel<Household>> getHouseholdById(
        @PathVariable("id") Integer id,
        ServerWebExchange exchange
    ) {
        Household household = householdService.getHousehold(id);
        
        return assembler.toModel(household, exchange);
    }
    
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<CollectionModel<EntityModel<Household>>> getAllHouseholds(ServerWebExchange exchange) {
        List<Household> households = householdService.getHouseholds();
        
        return assembler.toCollectionModel(Flux.fromIterable(households), exchange);
    }
}
