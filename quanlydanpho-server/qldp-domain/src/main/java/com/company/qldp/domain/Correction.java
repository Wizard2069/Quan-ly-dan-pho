package com.company.qldp.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Entity
@Table(name = "corrections")
@Access(AccessType.FIELD)
public class Correction {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;
    
    @Column(name = "change_info", nullable = false)
    private String changeInfo;
    
    @Column(name = "change_from", nullable = false)
    private String changeFrom;
    
    @Column(name = "change_to", nullable = false)
    private String changeTo;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "change_day", nullable = false)
    private Date changeDay;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "performer_id", nullable = false)
    private Manager performer;
}
