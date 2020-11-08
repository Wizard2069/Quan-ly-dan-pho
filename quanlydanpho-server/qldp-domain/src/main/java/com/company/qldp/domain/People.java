package com.company.qldp.domain;

import com.company.qldp.common.PeopleInfo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Entity
@Table(name = "people")
@Access(AccessType.FIELD)
@DynamicUpdate
public class People {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @Column(name = "people_code")
    private String peopleCode;
    
    @Embedded
    private PeopleInfo info;
    
    @Column(name = "alias")
    private String alias;
    
    @Column(name = "birth_place")
    private String birthPlace;
    
    @Embedded
    private PersonalExtraInfo extraInfo;
    
    @Column(name = "passport_number")
    private String passportNumber;
    
    @Column(name = "permanent_address")
    private String permanentAddress;
    
    @Embedded
    private PersonalMobilization mobilization;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "created_date")
    private Date createdDate;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "created_manager_id")
    private Manager createdManager;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "deleted_manager_id")
    private Manager deletedManager;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "deleted_date")
    private Date deletedDate;
    
    @Column(name = "deleted_reason")
    private String deletedReason;
    
    @Column(name = "note")
    private String note;
}
