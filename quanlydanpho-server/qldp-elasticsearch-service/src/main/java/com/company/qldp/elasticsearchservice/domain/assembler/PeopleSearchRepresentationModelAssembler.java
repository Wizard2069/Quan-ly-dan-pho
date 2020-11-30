package com.company.qldp.elasticsearchservice.domain.assembler;

import com.company.qldp.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.web.PeopleSearchController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class PeopleSearchRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<PeopleSearch> {
    
    public PeopleSearchRepresentationModelAssembler() {
        super(PeopleSearchController.class);
    }
    
    @Override
    public EntityModel<PeopleSearch> addLinks(EntityModel<PeopleSearch> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            Integer entityId = resource.getContent().getId();
            String entityLink = link.getHref() + "/" + entityId;
            
            resource.add(Link.of(entityLink));
            resource.add(link.withRel("people"));
    
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(PeopleSearchController.class).getPeople(exchange), exchange);
    }
}
