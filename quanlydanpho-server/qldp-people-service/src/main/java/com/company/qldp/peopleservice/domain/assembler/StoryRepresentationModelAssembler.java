package com.company.qldp.peopleservice.domain.assembler;

import com.company.qldp.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.qldp.domain.Story;
import com.company.qldp.peopleservice.web.StoryController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.reactive.WebFluxLinkBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.Map;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class StoryRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<Story> {
    
    public StoryRepresentationModelAssembler() {
        super(StoryController.class);
    }
    
    @Override
    public EntityModel<Story> addLinks(EntityModel<Story> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            String entityId = resource.getContent().getId().toString();
            String collectionLink = link.getHref();
            String entityLink = collectionLink + "/" + entityId;
            
            resource.add(Link.of(entityLink));
            resource.add(Link.of(collectionLink).withRel("stories"));
            
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    protected WebFluxLinkBuilder.WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        Map<String, String> attributes = exchange.getAttribute("org.springframework.web.reactive.HandlerMapping.uriTemplateVariables");
        assert attributes != null;
        
        return linkTo(methodOn(StoryController.class).getStoriesByPeopleId(
            Integer.parseInt(attributes.get("id")),
            exchange
        ), exchange);
    }
}
