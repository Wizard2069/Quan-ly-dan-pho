package com.company.qldp.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Entity
@Table(name = "death")
@Access(AccessType.FIELD)
public class Death {

    @Id
    @GeneratedValue
    private Integer id;
    
    @Column(name = "death_cert_number")
    private String deathCertNumber;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "declared_person_id")
    private People declaredPerson;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "death_person_id")
    private People deathPerson;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "declared_day")
    private Date declaredDay;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "death_day")
    private Date deathDay;
    
    @Column(name = "death_reason")
    private String deathReason;
}
