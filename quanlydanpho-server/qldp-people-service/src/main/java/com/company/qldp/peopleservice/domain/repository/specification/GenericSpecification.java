package com.company.qldp.peopleservice.domain.repository.specification;

import com.company.qldp.peopleservice.domain.exception.DateParseException;
import org.springframework.data.jpa.domain.Specification;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.data.jpa.domain.Specification.*;

public class GenericSpecification {
    
    public static <T> Specification<T> makeDateRangeSpecification(String dateRange) {
        String fromDate;
        String toDate = null;
    
        Specification<T> spec = null;
    
        if (dateRange != null) {
            String[] dateRangeArr = dateRange.split(",");
            fromDate = dateRangeArr[0];
        
            if (dateRangeArr.length > 1) {
                toDate = dateRangeArr[1];
            }
        
            Specification<T> fromSpec = where(hasDateFrom(fromDate));
            spec = fromSpec.and(hasDateTo(toDate));
        }
        
        return spec;
    }
    
    public static <T> Specification<T> hasDateFrom(String fromDateStr) {
        return (entity, cq, cb) -> {
            try {
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date fromDate = dateFormat.parse(fromDateStr);
                
                return cb.greaterThan(entity.get("interval").get("from"), fromDate);
            } catch (ParseException e) {
                throw new DateParseException(e.getMessage());
            }
        };
    }
    
    public static <T> Specification<T> hasDateTo(String toDateStr) {
        return (entity, cq, cb) -> {
            try {
                if (toDateStr == null) {
                    return cb.isNull(entity.get("interval").get("to"));
                }
                
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date toDate = dateFormat.parse(toDateStr);
        
                return cb.lessThan(entity.get("interval").get("from"), toDate);
            } catch (ParseException e) {
                throw new DateParseException(e.getMessage());
            }
        };
    }
}
