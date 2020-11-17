package com.company.qldp.peopleservice.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

import static com.company.qldp.common.PeopleInfo.Sex;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonDto {
    
    @NotNull
    @Length(min = 1)
    private String peopleCode;
    
    @NotNull
    @Length(min = 1)
    private String fullName;
    
    @NotNull
    private String birthday;
    
    @NotNull
    private String sex;
    
    private String job;
    
    @NotNull
    @Length(min = 1)
    private String currentAddress;
    
    private String alias;
    
    @NotNull
    private String birthPlace;
    
    @NotNull
    private String domicile;
    
    @NotNull
    private String nation;
    
    @NotNull
    private String religion;
    
    @NotNull
    private String nationality;
    
    private String passportNumber;
    
    @NotNull
    private String permanentAddress;
    
    @NotNull
    private String createdManagerUsername;
    
    @NotNull
    private String createdDate;
    
    private String note;
    
    public Sex getSex() {
        switch (sex) {
            case "male":
                return Sex.MALE;
            case "female":
                return Sex.FEMALE;
            case "other":
                return Sex.OTHER;
            default:
                throw new RuntimeException("Sex not found: " + sex);
        }
    }
}
