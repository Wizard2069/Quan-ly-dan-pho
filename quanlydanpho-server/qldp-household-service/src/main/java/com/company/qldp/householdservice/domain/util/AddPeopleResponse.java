package com.company.qldp.householdservice.domain.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPeopleResponse {
    
    private List<FamilyMemberResponse> data;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FamilyMemberResponse {
        private Integer personId;
        private Integer householdId;
        private String hostRelation;
    }
}
