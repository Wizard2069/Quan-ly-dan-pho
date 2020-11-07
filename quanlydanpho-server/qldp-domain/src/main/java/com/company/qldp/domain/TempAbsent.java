package com.company.qldp.domain;

import com.company.qldp.common.DateInterval;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Entity
@Table(name = "temp_absent")
@Access(AccessType.FIELD)
public class TempAbsent {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id", nullable = false)
    private People person;
    
    @Column(name = "temp_absent_code", nullable = false)
    private String tempAbsentCode;
    
    @Column(name = "temp_residence_place", nullable = false)
    private String tempResidencePlace;
    
    @Embedded
    private DateInterval interval;
    
    @Column(name = "reason", nullable = false)
    private String reason;
}
