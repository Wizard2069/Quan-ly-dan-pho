package com.company.qldp.peopleservice.domain.assembler;

import com.company.qldp.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.qldp.domain.Death;
import com.company.qldp.peopleservice.web.DeathController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class DeathRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<Death> {
    
    public DeathRepresentationModelAssembler() {
        super(DeathController.class);
    }
    
    @Override
    public EntityModel<Death> addLinks(EntityModel<Death> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            String entityId = resource.getContent().getId().toString();
            String collectionLink = link.getHref().replace("/{id}", "");
            String entityLink = collectionLink + "/" + entityId;
            
            resource.add(Link.of(collectionLink).withRel("deaths"));
            resource.add(Link.of(entityLink));
            
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(DeathController.class).getDeathById(null, exchange), exchange);
    }
}
