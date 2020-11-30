package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.Stay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StayRepository extends JpaRepository<Stay, Integer> {
    
    Stay findByTempResidenceCode(String code);
}
