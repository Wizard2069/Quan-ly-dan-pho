package com.company.qldp.requestmanagementservice.domain.repository;

import com.company.qldp.domain.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetitionRepository extends JpaRepository<Petition, Integer> {

    List<Petition> findAllBySender_KeycloakUid(String uid);
    
    Petition findBySender_KeycloakUidAndId(String uid, Integer id);
}
