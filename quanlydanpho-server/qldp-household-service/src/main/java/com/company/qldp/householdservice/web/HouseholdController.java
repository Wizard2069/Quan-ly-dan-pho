package com.company.qldp.householdservice.web;

import com.company.qldp.domain.Household;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.service.HouseholdService;
import com.company.qldp.householdservice.domain.util.CreateHouseholdResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
    path = "/api/manager",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class HouseholdController {
    
    private HouseholdService householdService;
    
    @Autowired
    public HouseholdController(HouseholdService householdService) {
        this.householdService = householdService;
    }
    
    @PostMapping(
        path = "/households",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateHouseholdResponse>> createHousehold(@Valid HouseholdDto householdDto) {
        Household household = householdService.createHousehold(householdDto);
        
        return Mono.just(new ResponseEntity<>(
            makeCreateHouseholdResponse(household.getId()),
            HttpStatus.CREATED
        ));
    }
    
    private CreateHouseholdResponse makeCreateHouseholdResponse(Integer id) {
        return new CreateHouseholdResponse(id);
    }
}
