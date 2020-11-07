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
@Table(name = "stay")
@Access(AccessType.FIELD)
public class Stay {

    @Id
    @GeneratedValue
    private Integer id;
    
    @ManyToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id", nullable = false)
    private People person;
    
    @Column(name = "temp_residence_code", nullable = false)
    private String tempResidenceCode;
    
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    
    @Embedded
    private DateInterval interval;
    
    @Column(name = "reason", nullable = false)
    private String reason;
}
