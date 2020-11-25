package com.company.qldp.householdservice.domain.repository;

import com.company.qldp.domain.FamilyMember;
import com.company.qldp.domain.HouseholdPeopleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyMemberRepository extends JpaRepository<FamilyMember, HouseholdPeopleId> {

}
