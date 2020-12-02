package com.company.qldp.peopleservice.domain.util;

import com.company.qldp.common.DateInterval;
import com.company.qldp.peopleservice.domain.exception.InvalidDateRangeException;

import java.time.Instant;
import java.util.Date;

public class CreateDateInterval {
    
    public static DateInterval create(String fromDate, String toDate) {
        Date from = Date.from(Instant.parse(fromDate));
        Date to = Date.from(Instant.parse(toDate));
        
        if (to.before(from)) {
            throw new InvalidDateRangeException();
        }
        
        DateInterval interval = DateInterval.builder()
            .from(from).to(to)
            .build();
        
        return interval;
    }
}
