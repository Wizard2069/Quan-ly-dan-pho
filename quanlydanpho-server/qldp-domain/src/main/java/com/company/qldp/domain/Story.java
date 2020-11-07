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
@Table(name = "story")
@Access(AccessType.FIELD)
public class Story {

    @Id
    @GeneratedValue
    private Integer id;
    
    @OneToOne(
        optional = false,
        fetch = FetchType.LAZY
    )
    @JoinColumn(name = "person_id", nullable = false)
    private People person;
    
    @Embedded
    private DateInterval interval;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "job", nullable = false)
    private String job;
    
    @Column(name = "workplace", nullable = false)
    private String workplace;
}
