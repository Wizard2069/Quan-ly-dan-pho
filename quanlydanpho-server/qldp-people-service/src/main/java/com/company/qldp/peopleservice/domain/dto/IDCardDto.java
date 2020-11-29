package com.company.qldp.peopleservice.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IDCardDto {
    
    @NotNull
    @Length(min = 1)
    private String peopleCode;
    
    @NotNull
    @Length(min = 1)
    private String idCardNumber;
    
    @NotNull
    @Length(min = 1)
    private String issuedDay;
    
    @NotNull
    @Length(min = 1)
    private String issuedPlace;
}
