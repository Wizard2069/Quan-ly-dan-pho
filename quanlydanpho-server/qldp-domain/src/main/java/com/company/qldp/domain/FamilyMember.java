package com.company.qldp.domain;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "family_member")
@Access(AccessType.FIELD)
public class FamilyMember {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @OneToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id", nullable = false)
    private People person;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;
    
    @Column(name = "host_relation")
    private String hostRelation;
}
