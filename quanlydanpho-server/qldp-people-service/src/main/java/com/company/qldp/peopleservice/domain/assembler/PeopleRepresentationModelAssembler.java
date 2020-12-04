package com.company.qldp.peopleservice.domain.assembler;

import com.company.qldp.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.qldp.domain.People;
import com.company.qldp.peopleservice.web.PeopleController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.Map;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class PeopleRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<People> {
    
    public PeopleRepresentationModelAssembler() {
        super(PeopleController.class);
    }
    
    @Override
    public EntityModel<People> addLinks(EntityModel<People> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            String entityId = resource.getContent().getId().toString();
            String entityLink = link.getHref().replace("{id}", entityId);
            String collectionLink = entityLink.replace("/" + entityId, "");
            
            resource.add(Link.of(entityLink));
            resource.add(Link.of(collectionLink).withRel("people"));
            
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        Map<String, String> attributes = exchange.getAttribute("org.springframework.web.reactive.HandlerMapping.uriTemplateVariables");
        assert attributes != null;
        
        return linkTo(methodOn(PeopleController.class).getPersonById(null, exchange), exchange);
    }
}
