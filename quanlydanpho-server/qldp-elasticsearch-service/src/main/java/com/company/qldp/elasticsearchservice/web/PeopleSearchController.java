package com.company.qldp.elasticsearchservice.web;

import com.company.qldp.elasticsearchservice.domain.assembler.PeopleRepresentationModelAssembler;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.domain.service.PeopleSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(
    path = "/people",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class PeopleSearchController {
    
    private PeopleSearchService peopleSearchService;
    
    private PeopleRepresentationModelAssembler assembler;
    
    @Autowired
    public PeopleSearchController(
        PeopleSearchService peopleSearchService,
        PeopleRepresentationModelAssembler assembler
    ) {
        this.peopleSearchService = peopleSearchService;
        this.assembler = assembler;
    }
    
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<CollectionModel<EntityModel<PeopleSearch>>> getPeople(ServerWebExchange exchange) {
        MultiValueMap<String, String> queryParams = exchange.getRequest().getQueryParams();
        String name = queryParams.getFirst("name");
        String idCard = queryParams.getFirst("id-card");
        String code = queryParams.getFirst("code");
        
        Flux<PeopleSearch> peopleSearchFlux;
        
        if (name != null) {
            peopleSearchFlux = peopleSearchService.findPeopleByFullName(name);
        } else if (idCard != null) {
            peopleSearchFlux = peopleSearchService.findPeopleByIDCardNumber(idCard);
        } else if (code != null) {
            peopleSearchFlux = peopleSearchService.findPeopleByCode(code);
        } else {
            peopleSearchFlux = peopleSearchService.findAllPeople();
        }
        
        return assembler.toCollectionModel(peopleSearchFlux, exchange);
    }
}
