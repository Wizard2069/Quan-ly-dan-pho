package com.company.qldp.common;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Embeddable
@Access(AccessType.FIELD)
public class PeopleInfo {
    
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "birthday", nullable = false)
    private Date birthday;
    
    @Column(name = "sex", nullable = false)
    @Enumerated(EnumType.STRING)
    private SEX sex;
    
    @Column(name = "job", nullable = false)
    private String job;
    
    @Column(name = "current_address", nullable = false)
    private String currentAddress;
    
    enum SEX {
        MALE, FEMALE, OTHER
    }
}
