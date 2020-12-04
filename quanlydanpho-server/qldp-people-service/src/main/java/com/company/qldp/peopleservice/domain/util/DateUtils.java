package com.company.qldp.peopleservice.domain.util;

import com.company.qldp.peopleservice.domain.exception.InvalidDateRangeException;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DateUtils {
    
    public static Map<String, Date> getDateRange(String fromDateStr, String toDateStr) {
        if (fromDateStr == null || toDateStr == null) {
            throw new InvalidDateRangeException();
        }
    
        Date from = Date.from(Instant.parse(fromDateStr));
        Date to = Date.from(Instant.parse(toDateStr));
        
        if (to.before(from)) {
            throw new InvalidDateRangeException();
        }
    
        Map<String, Date> dateRange = new HashMap<>();
        dateRange.put("from", from);
        dateRange.put("to", to);
        
        return dateRange;
    }
}
