package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.Death;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeathRepository extends JpaRepository<Death, Integer> {
    
    Death findByDeathCertNumber(String deathCertNumber);
}
