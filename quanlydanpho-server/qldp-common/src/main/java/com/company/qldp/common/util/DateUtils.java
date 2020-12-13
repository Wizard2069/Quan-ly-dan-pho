package com.company.qldp.common.util;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.exception.InvalidDateRangeException;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DateUtils {
    
    public static DateInterval createDateInterval(String fromDate, String toDate) {
        Date from = Date.from(Instant.parse(fromDate));
        
        if (toDate.isEmpty()) {
            return DateInterval.builder()
                .from(from).to(null)
                .build();
        } else {
            Date to = Date.from(Instant.parse(toDate));
            
            if (to.before(from)) {
                throw new InvalidDateRangeException();
            }
    
            return DateInterval.builder()
                .from(from).to(to)
                .build();
        }
    }
    
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
    
    public static int getBirthYear(Integer age) {
        return Calendar.getInstance().get(Calendar.YEAR) - age;
    }
}
