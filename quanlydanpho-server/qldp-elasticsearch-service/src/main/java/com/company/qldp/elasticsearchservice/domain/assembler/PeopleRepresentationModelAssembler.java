package com.company.qldp.elasticsearchservice.domain.assembler;

import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.web.PeopleSearchController;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class PeopleRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<PeopleSearch> {
    
    public PeopleRepresentationModelAssembler() {
        super(PeopleSearchController.class);
    }
    
    @Override
    protected WebFluxBuilder getCollectionLinkBuilder(ServerWebExchange exchange) {
        return initLinkBuilder(exchange);
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(PeopleSearchController.class).getPeople(exchange), exchange);
    }
}
