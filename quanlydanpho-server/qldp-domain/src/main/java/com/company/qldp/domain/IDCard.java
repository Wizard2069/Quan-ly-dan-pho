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
@Table(name = "id_card")
@Access(AccessType.FIELD)
public class IDCard {

    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id", nullable = false)
    private People person;
    
    @Column(name = "id_card_number", nullable = false, length = 12)
    private String idCardNumber;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "issued_day", nullable = false)
    private Date issuedDay;
    
    @Column(name = "issued_place", nullable = false)
    private String issuedPlace;
}
