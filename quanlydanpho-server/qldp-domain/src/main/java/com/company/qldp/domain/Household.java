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
@Table(name = "household")
@Access(AccessType.FIELD)
public class Household {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @Column(name = "household_code", nullable = false)
    private String householdCode;
    
    @OneToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "host_id")
    private People host;
    
    @Column(name = "area_code", nullable = false)
    private String areaCode;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "created_day", nullable = false)
    private Date createdDay;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "leave_day")
    private Date leaveDay;
    
    @Column(name = "leave_reason")
    private String leaveReason;
    
    @OneToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "performer_id")
    private People performer;
}
