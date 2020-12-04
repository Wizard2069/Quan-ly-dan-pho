package com.company.qldp.peopleservice.domain.repository;

import com.company.qldp.domain.Death;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface DeathRepository extends JpaRepository<Death, Integer> {
    
    Death findByDeathCertNumber(String deathCertNumber);
    
    List<Death> findAllByDeclaredDayBetween(Date from, Date to);
}
