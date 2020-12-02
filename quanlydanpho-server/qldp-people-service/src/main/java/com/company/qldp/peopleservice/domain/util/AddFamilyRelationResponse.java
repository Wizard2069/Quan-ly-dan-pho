package com.company.qldp.peopleservice.domain.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFamilyRelationResponse {
    
    private List<Relation> relations;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Relation {
        
        private Integer peopleId;
        private String peopleRelation;
    }
}
