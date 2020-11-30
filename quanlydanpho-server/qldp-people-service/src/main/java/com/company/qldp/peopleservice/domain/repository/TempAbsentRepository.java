package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.TempAbsent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempAbsentRepository extends JpaRepository<TempAbsent, Integer> {

    TempAbsent findByTempAbsentCode(String code);
}
