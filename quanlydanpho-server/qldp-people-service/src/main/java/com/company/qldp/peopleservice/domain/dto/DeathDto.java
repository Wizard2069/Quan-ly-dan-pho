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
public class DeathDto {

    @NotNull
    @Length(min = 1)
    private String deathCertNumber;
    
    @NotNull
    @Length(min = 1)
    private String declaredPersonCode;
    
    @NotNull
    @Length(min = 1)
    private String deathPersonCode;
    
    @NotNull
    @Length(min = 1)
    private String declaredDay;
    
    @NotNull
    @Length(min = 1)
    private String deathDay;
    
    @NotNull
    @Length(min = 1)
    private String deathReason;
    
    @NotNull
    @Length(min = 1)
    private String deletedManagerUsername;
}
