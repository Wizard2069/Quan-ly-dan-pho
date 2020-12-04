package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.Stay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface StayRepository extends JpaRepository<Stay, Integer> {
    
    Stay findByTempResidenceCode(String code);
    
    default List<Stay> findAllByDateRange(Date from, Date to) {
        return this.findAllByInterval_FromGreaterThanEqualAndInterval_ToLessThanEqual(from, to);
    }
    
    List<Stay> findAllByInterval_FromGreaterThanEqualAndInterval_ToLessThanEqual(Date from, Date to);
}
