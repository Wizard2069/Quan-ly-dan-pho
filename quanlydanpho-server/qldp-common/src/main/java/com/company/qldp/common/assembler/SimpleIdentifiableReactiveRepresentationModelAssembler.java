package com.company.qldp.common.assembler;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.GenericTypeResolver;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.LinkRelationProvider;
import org.springframework.hateoas.server.core.EvoInflectorLinkRelationProvider;
import org.springframework.hateoas.server.reactive.SimpleReactiveRepresentationModelAssembler;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Getter
@NoArgsConstructor
public class SimpleIdentifiableReactiveRepresentationModelAssembler<T>
    implements SimpleReactiveRepresentationModelAssembler<T> {
    
    private Class<?> controllerClass;
    
    private LinkRelationProvider relationProvider;
    
    private Class<?> resourceType;
    
    @Setter
    private String basePath = "";
    
    public SimpleIdentifiableReactiveRepresentationModelAssembler(
        Class<?> controllerClass,
        LinkRelationProvider relationProvider
    ) {
        this.controllerClass = controllerClass;
        this.relationProvider = relationProvider;
        
        this.resourceType = GenericTypeResolver.resolveTypeArgument(
            this.getClass(),
            SimpleIdentifiableReactiveRepresentationModelAssembler.class
        );
    }
    
    public SimpleIdentifiableReactiveRepresentationModelAssembler(Class<?> controllerClass) {
        this(controllerClass, new EvoInflectorLinkRelationProvider());
    }
    
    @Override
    public EntityModel<T> addLinks(EntityModel<T> resource, ServerWebExchange exchange) {
        initLinkBuilder(exchange).withSelfRel().toMono(link -> {
            resource.add(link);
            
            return link;
        }).subscribe();
        
        return resource;
    }
    
    @Override
    public Mono<CollectionModel<EntityModel<T>>> toCollectionModel(
        Flux<? extends T> entities,
        ServerWebExchange exchange
    ) {
        MultiValueMap<String, String> queryParams = exchange.getRequest().getQueryParams();
        String pageStr = queryParams.getFirst("page");
        String limitStr = queryParams.getFirst("limit");
        
        if (pageStr == null) {
            pageStr = "1";
        }
        if (limitStr == null) {
            limitStr = "10";
        }
        
        int limit = Integer.parseInt(limitStr);
        int page = Integer.parseInt(pageStr);
        
        Mono<Long> totalElements = entities.count();
        
        return entities
            .skip((long) (page - 1) * limit)
            .take(limit)
            .flatMap(entity -> toModel(entity, exchange))
            .collectList()
            .zipWith(totalElements)
            .map(tuple2 -> {
                List<EntityModel<T>> entitiesModel = tuple2.getT1();
                long total = tuple2.getT2();
                
                return PagedModel.of(entitiesModel, new PagedModel.PageMetadata(
                    limit,
                    page,
                    total,
                    (long) Math.ceil(total * 1.0 / limit)
                ));
            })
            .map(it -> addLinks(it, exchange));
    }
    
    public PagedModel<EntityModel<T>> addLinks(
        PagedModel<EntityModel<T>> resources,
        ServerWebExchange exchange
    ) {
        assert resources.getMetadata() != null;
        long lastPage = resources.getMetadata().getTotalPages();
    
        initLinkBuilder(exchange).withRel("base").toMono(link -> {
            resources.add(link);
        
            return link;
        }).subscribe();
        
        String self = exchange.getRequest().getURI().toString();
        resources.add(Link.of(self).withSelfRel());
        
        if (lastPage > 0) {
            MultiValueMap<String, String> queryParams = exchange.getRequest().getQueryParams();
            String pageStr = queryParams.getFirst("page");
            
            String[] paths = self.split("&");
    
            String selfLink = Arrays.stream(paths).filter(path -> !path.contains("page"))
                .collect(Collectors.joining("&"));
            
            if (pageStr == null) {
                pageStr = "1";
            }
            
            int page = Integer.parseInt(pageStr);
            
            String pageQuery = "?page=";
            if (selfLink.contains("?")) {
                pageQuery = "&page=";
            }
    
            if (page > 1) {
                resources.add(Link.of(selfLink + pageQuery + (page - 1)).withRel("prev"));
            }
            if (page < lastPage) {
                resources.add(Link.of(selfLink + pageQuery + (page + 1)).withRel("next"));
            }
    
            resources.add(Link.of(selfLink + pageQuery + page).withRel("current"))
                .add(Link.of(selfLink + pageQuery + "1").withRel("first"))
                .add(Link.of(selfLink + pageQuery + lastPage).withRel("last"));
        }
        
        return resources;
    }
    
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return null;
    }
}
