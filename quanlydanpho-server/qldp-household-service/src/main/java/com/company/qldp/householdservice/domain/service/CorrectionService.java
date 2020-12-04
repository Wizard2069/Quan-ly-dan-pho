package com.company.qldp.householdservice.domain.service;

import com.company.qldp.domain.Correction;
import com.company.qldp.domain.Household;
import com.company.qldp.domain.People;
import com.company.qldp.householdservice.domain.dto.CorrectionDto;
import com.company.qldp.householdservice.domain.exception.HouseholdNotFoundException;
import com.company.qldp.householdservice.domain.repository.CorrectionRepository;
import com.company.qldp.householdservice.domain.repository.HouseholdRepository;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class CorrectionService {
    
    private CorrectionRepository correctionRepository;
    private HouseholdRepository householdRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public CorrectionService(
        CorrectionRepository correctionRepository,
        HouseholdRepository householdRepository,
        PeopleRepository peopleRepository
    ) {
        this.correctionRepository = correctionRepository;
        this.householdRepository = householdRepository;
        this.peopleRepository = peopleRepository;
    }
    
    public Correction createCorrection(Integer id, CorrectionDto correctionDto) {
        Household household = householdRepository.findById(id)
            .orElseThrow(HouseholdNotFoundException::new);
        People performer = peopleRepository.findById(correctionDto.getPerformerId())
            .orElseThrow(PersonNotFoundException::new);
        
        Correction correction = Correction.builder()
            .household(household)
            .changeInfo(correctionDto.getChangeInfo())
            .changeDay(Date.from(Instant.parse(correctionDto.getChangeDate())))
            .changeFrom(correctionDto.getChangeFrom())
            .changeTo(correctionDto.getChangeTo())
            .performer(performer)
            .build();
        
        return correctionRepository.save(correction);
    }
    
    @Transactional
    public List<Correction> getCorrectionsByHouseholdId(Integer id) {
        List<Correction> corrections = correctionRepository.findAllByHousehold_Id(id);
        corrections.forEach(this::getCorrectionInfo);
        
        return corrections;
    }
    
    private void getCorrectionInfo(Correction correction) {
        correction.getPerformer().hashCode();
    }
}
