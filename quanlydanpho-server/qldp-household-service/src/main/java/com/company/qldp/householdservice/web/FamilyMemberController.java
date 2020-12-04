package com.company.qldp.householdservice.web;

import com.company.qldp.domain.FamilyMember;
import com.company.qldp.householdservice.domain.dto.FamilyMemberDto;
import com.company.qldp.householdservice.domain.service.FamilyMemberService;
import com.company.qldp.householdservice.domain.util.AddPeopleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(
    path = "/households",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class FamilyMemberController {
    
    private FamilyMemberService familyMemberService;
    
    @Autowired
    public FamilyMemberController(FamilyMemberService familyMemberService) {
        this.familyMemberService = familyMemberService;
    }
    
    @PostMapping(
        path = "/{id}/family",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Mono<ResponseEntity<AddPeopleResponse>> addPeople(
        @PathVariable("id") Integer id,
        @Valid @RequestBody FamilyMemberDto familyMemberDto
    ) {
        List<FamilyMember> familyMembers = familyMemberService.addPeopleToHousehold(id, familyMemberDto);
        
        return Mono.just(new ResponseEntity<>(
            makeAddPeopleResponse(familyMembers),
            HttpStatus.OK
        ));
    }
    
    private AddPeopleResponse makeAddPeopleResponse(List<FamilyMember> familyMembers) {
        List<AddPeopleResponse.FamilyMemberResponse> familyMemberResponses = new ArrayList<>();
        
        for (FamilyMember familyMember : familyMembers) {
            AddPeopleResponse.FamilyMemberResponse familyMemberResponse = AddPeopleResponse.FamilyMemberResponse.builder()
                .personId(familyMember.getPerson().getId())
                .householdId(familyMember.getHousehold().getId())
                .hostRelation(familyMember.getHostRelation())
                .build();
            familyMemberResponses.add(familyMemberResponse);
        }
        
        return new AddPeopleResponse(familyMemberResponses);
    }
}
