package com.company.qldp.domain;

import com.company.qldp.common.DateInterval;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
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
    @JoinColumn(name = "person_id")
    private People person;
    
    @Embedded
    private DateInterval interval;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "job")
    private String job;
    
    @Column(name = "workplace")
    private String workplace;
}
