package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Stay;
import com.company.qldp.peopleservice.domain.dto.StayDto;
import com.company.qldp.peopleservice.domain.service.StayService;
import com.company.qldp.peopleservice.domain.util.CreateStayResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/people/stay",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class StayController {
    
    private StayService stayService;
    
    @Autowired
    public StayController(StayService stayService) {
        this.stayService = stayService;
    }
    
    @PostMapping(
        path = "/stay",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateStayResponse>> createStay(@Valid StayDto stayDto) {
        Stay stay = stayService.createStay(stayDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateStayResponse(stay.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreateStayResponse makeCreateStayResponse(Integer id) {
        return new CreateStayResponse(id);
    }
}
