package com.company.qldp.peopleservice.domain.assembler;

import com.company.qldp.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.qldp.domain.TempAbsent;
import com.company.qldp.peopleservice.web.TempAbsentController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class TempAbsentRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<TempAbsent> {
    
    public TempAbsentRepresentationModelAssembler() {
        super(TempAbsentController.class);
    }
    
    @Override
    public EntityModel<TempAbsent> addLinks(EntityModel<TempAbsent> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            String entityId = resource.getContent().getId().toString();
            String collectionLink = link.getHref();
            String entityLink = collectionLink + "/" + entityId;
            
            resource.add(Link.of(entityLink));
            resource.add(Link.of(collectionLink).withRel("tempAbsents"));
            
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(TempAbsentController.class).getAllTempAbsents(exchange), exchange);
    }
}
