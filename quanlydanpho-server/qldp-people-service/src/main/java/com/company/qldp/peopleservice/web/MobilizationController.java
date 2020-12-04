package com.company.qldp.peopleservice.web;

import com.company.qldp.domain.Stay;
import com.company.qldp.domain.TempAbsent;
import com.company.qldp.peopleservice.domain.dto.StayDto;
import com.company.qldp.peopleservice.domain.dto.TempAbsentDto;
import com.company.qldp.peopleservice.domain.service.MobilizationService;
import com.company.qldp.peopleservice.domain.util.CreateStayResponse;
import com.company.qldp.peopleservice.domain.util.CreateTempAbsentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/mobilization",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class MobilizationController {
    
    private MobilizationService mobilizationService;
    
    @Autowired
    public MobilizationController(MobilizationService mobilizationService) {
        this.mobilizationService = mobilizationService;
    }
    
    @PostMapping(
        path = "/temp-absent",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateTempAbsentResponse>> createTempAbsent(@Valid TempAbsentDto tempAbsentDto) {
        TempAbsent tempAbsent = mobilizationService.createTempAbsent(tempAbsentDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateTempAbsentResponse(tempAbsent.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreateTempAbsentResponse makeCreateTempAbsentResponse(Integer id) {
        return new CreateTempAbsentResponse(id);
    }
    
    @PostMapping(
        path = "/stay",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateStayResponse>> createStay(@Valid StayDto stayDto) {
        Stay stay = mobilizationService.createStay(stayDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateStayResponse(stay.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreateStayResponse makeCreateStayResponse(Integer id) {
        return new CreateStayResponse(id);
    }
}
