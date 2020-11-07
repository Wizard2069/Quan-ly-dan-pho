package com.company.qldp.common;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@Builder
@Embeddable
@Access(AccessType.FIELD)
public class DateInterval {
    
    @Temporal(TemporalType.DATE)
    @Column(name = "from_date")
    private Date from;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "to_date")
    private Date to;
}
