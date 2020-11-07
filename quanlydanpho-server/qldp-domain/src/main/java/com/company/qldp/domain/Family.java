package com.company.qldp.domain;

import com.company.qldp.common.PeopleInfo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Entity
@Table(name = "family")
@Access(AccessType.FIELD)
public class Family {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @OneToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id")
    private People person;
    
    @Embedded
    private PeopleInfo info;
    
    @Column(name = "person_relation", nullable = false)
    private String personRelation;
}
