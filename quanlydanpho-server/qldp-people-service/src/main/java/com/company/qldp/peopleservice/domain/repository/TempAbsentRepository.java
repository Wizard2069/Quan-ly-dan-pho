package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.TempAbsent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TempAbsentRepository extends JpaRepository<TempAbsent, Integer> {

    TempAbsent findByTempAbsentCode(String code);
    
    default List<TempAbsent> findAllByDateRange(Date from, Date to) {
        return this.findAllByInterval_FromGreaterThanEqualAndInterval_ToLessThanEqual(from, to);
    }
    
    List<TempAbsent> findAllByInterval_FromGreaterThanEqualAndInterval_ToLessThanEqual(Date from, Date to);
}
