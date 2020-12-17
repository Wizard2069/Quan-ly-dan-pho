package com.company.qldp.requestmanagementservice.domain.repository;

import com.company.qldp.domain.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetitionRepository extends JpaRepository<Petition, Integer> {
    
    Petition findBySender_KeycloakUidAndId(String uid, Integer id);
}
