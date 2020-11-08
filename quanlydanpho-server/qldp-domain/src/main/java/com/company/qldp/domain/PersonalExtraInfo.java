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
public class PersonalExtraInfo {
    
    @Column(name = "domicile")
    private String domicile;
    
    @Column(name = "nation")
    private String nation;
    
    @Column(name = "religion")
    private String religion;
    
    @Column(name = "nationality")
    private String nationality;
}
