package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.People;
import com.company.qldp.domain.PersonalMobilization;
import com.company.qldp.domain.TempAbsent;
import com.company.qldp.peopleservice.domain.dto.TempAbsentDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.exception.TempAbsentNotFoundException;
import com.company.qldp.peopleservice.domain.repository.IDCardRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.repository.TempAbsentRepository;
import com.company.qldp.common.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class TempAbsentService {
    
    private TempAbsentRepository tempAbsentRepository;
    private IDCardRepository idCardRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public TempAbsentService(
        TempAbsentRepository tempAbsentRepository,
        IDCardRepository idCardRepository,
        PeopleRepository peopleRepository
    ) {
        this.tempAbsentRepository = tempAbsentRepository;
        this.idCardRepository = idCardRepository;
        this.peopleRepository = peopleRepository;
    }
    
    @Transactional
    public TempAbsent createTempAbsent(TempAbsentDto tempAbsentDto) {
        People people = idCardRepository.findByIdCardNumber(tempAbsentDto.getIdCardNumber())
            .getPerson();
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
        
        DateInterval interval = DateUtils.createDateInterval(
            tempAbsentDto.getFromDate(),
            tempAbsentDto.getToDate()
        );
        
        String code = RandomCodeGenerator.generateCode(8);
        while (tempAbsentCodeExists(code)) {
            code = RandomCodeGenerator.generateCode(8);
        }
        
        TempAbsent tempAbsent = TempAbsent.builder()
            .interval(interval)
            .person(people)
            .tempAbsentCode(code)
            .tempResidencePlace(tempAbsentDto.getTempResidentPlace())
            .reason(tempAbsentDto.getReason())
            .build();
        
        PersonalMobilization mobilization = PersonalMobilization.builder()
            .leaveDate(tempAbsent.getInterval().getFrom())
            .leaveReason(tempAbsent.getReason())
            .newAddress(tempAbsent.getTempResidencePlace())
            .build();
        people.setMobilization(mobilization);
        peopleRepository.save(people);
        
        return tempAbsentRepository.save(tempAbsent);
    }
    
    private boolean tempAbsentCodeExists(String code) {
        return tempAbsentRepository.findByTempAbsentCode(code) != null;
    }
    
    @Transactional
    public TempAbsent getTempAbsent(Integer id) {
        TempAbsent tempAbsent = tempAbsentRepository.findById(id)
            .orElseThrow(TempAbsentNotFoundException::new);
        tempAbsent.getPerson().hashCode();
        
        return tempAbsent;
    }
    
    @Transactional
    public List<TempAbsent> getTempAbsents() {
        List<TempAbsent> tempAbsents = tempAbsentRepository.findAll();
        tempAbsents.forEach(tempAbsent -> tempAbsent.getPerson().hashCode());
        
        return tempAbsents;
    }
    
    @Transactional
    public List<TempAbsent> getTempAbsentsByDateRange(String fromDateStr, String toDateStr) {
        Map<String, Date> dateRange = DateUtils.getDateRange(fromDateStr, toDateStr);
        Date from = dateRange.get("from");
        Date to = dateRange.get("to");
        
        List<TempAbsent> tempAbsents = tempAbsentRepository.findAllByDateRange(from, to);
        tempAbsents.forEach(tempAbsent -> tempAbsent.getPerson().hashCode());
        
        return tempAbsents;
    }
}
