package com.company.qldp.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Embeddable
@Access(AccessType.FIELD)
public class PersonalEducationInfo {
    
    @Column(name = "academic_level", nullable = false)
    private String academicLevel;
    
    @Column(name = "qualification", nullable = false)
    private String qualification;
    
    @Column(name = "ethnic_language", nullable = false)
    private String ethnicLanguage;
    
    @Column(name = "languageLevel", nullable = false)
    private String languageLevel;
    
    @Column(name = "workplace", nullable = false)
    private String workplace;
    
    @Column(name = "criminal_record")
    private String criminalRecord;
}
