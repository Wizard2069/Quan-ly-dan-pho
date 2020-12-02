package com.company.qldp.householdservice.web;

import com.company.qldp.domain.FamilyMember;
import com.company.qldp.domain.Household;
import com.company.qldp.householdservice.domain.dto.FamilyMemberDto;
import com.company.qldp.householdservice.domain.dto.HouseholdDto;
import com.company.qldp.householdservice.domain.service.HouseholdService;
import com.company.qldp.householdservice.domain.util.AddPeopleResponse;
import com.company.qldp.householdservice.domain.util.CreateHouseholdResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static com.company.qldp.householdservice.domain.util.AddPeopleResponse.*;

@RestController
@RequestMapping(
    path = "/households",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class HouseholdController {
    
    private HouseholdService householdService;
    
    @Autowired
    public HouseholdController(HouseholdService householdService) {
        this.householdService = householdService;
    }
    
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
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
    
    @PostMapping(
        path = "/{id}/family",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Mono<ResponseEntity<AddPeopleResponse>> addPeople(
        @PathVariable("id") Integer id,
        @Valid @RequestBody FamilyMemberDto familyMemberDto
    ) {
        List<FamilyMember> familyMembers = householdService.addPeopleToHousehold(id, familyMemberDto);
        
        return Mono.just(new ResponseEntity<>(
            makeAddPeopleResponse(familyMembers),
            HttpStatus.OK
        ));
    }
    
    private AddPeopleResponse makeAddPeopleResponse(List<FamilyMember> familyMembers) {
        List<FamilyMemberResponse> familyMemberResponses = new ArrayList<>();
        
        for (FamilyMember familyMember : familyMembers) {
            FamilyMemberResponse familyMemberResponse = FamilyMemberResponse.builder()
                .personId(familyMember.getPerson().getId())
                .householdId(familyMember.getHousehold().getId())
                .hostRelation(familyMember.getHostRelation())
                .build();
            familyMemberResponses.add(familyMemberResponse);
        }
        
        return new AddPeopleResponse(familyMemberResponses);
    }
}
