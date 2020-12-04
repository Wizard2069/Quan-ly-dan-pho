package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.People;
import com.company.qldp.domain.PersonalMobilization;
import com.company.qldp.domain.Stay;
import com.company.qldp.peopleservice.domain.dto.StayDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.exception.StayNotFoundException;
import com.company.qldp.peopleservice.domain.repository.IDCardRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.repository.StayRepository;
import com.company.qldp.common.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class StayService {
    
    private StayRepository stayRepository;
    private IDCardRepository idCardRepository;
    private PeopleRepository peopleRepository;
    
    @Autowired
    public StayService(
        StayRepository stayRepository,
        IDCardRepository idCardRepository,
        PeopleRepository peopleRepository
    ) {
        this.stayRepository = stayRepository;
        this.idCardRepository = idCardRepository;
        this.peopleRepository = peopleRepository;
    }
    
    @Transactional
    public Stay createStay(StayDto stayDto) {
        People people = idCardRepository.findByIdCardNumber(stayDto.getIdCardNumber())
            .getPerson();
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
        
        DateInterval interval = DateUtils.createDateInterval(
            stayDto.getFromDate(),
            stayDto.getToDate()
        );
        
        String code = RandomCodeGenerator.generateCode(8);
        while (tempResidentCodeExists(code)) {
            code = RandomCodeGenerator.generateCode(8);
        }
        
        Stay stay = Stay.builder()
            .person(people)
            .tempResidenceCode(code)
            .phoneNumber(stayDto.getPhoneNumber())
            .interval(interval)
            .reason(stayDto.getReason())
            .build();
        
        PersonalMobilization mobilization = PersonalMobilization.builder()
            .arrivalDate(stay.getInterval().getFrom())
            .arrivalReason(stay.getReason())
            .build();
        people.setMobilization(mobilization);
        peopleRepository.save(people);
        
        return stayRepository.save(stay);
    }
    
    private boolean tempResidentCodeExists(String code) {
        return stayRepository.findByTempResidenceCode(code) != null;
    }
    
    @Transactional
    public Stay getStay(Integer id) {
        Stay stay = stayRepository.findById(id)
            .orElseThrow(StayNotFoundException::new);
        stay.getPerson().hashCode();
        
        return stay;
    }
    
    @Transactional
    public List<Stay> getStays() {
        List<Stay> stays = stayRepository.findAll();
        stays.forEach(stay -> stay.getPerson().hashCode());
        
        return stays;
    }
    
    @Transactional
    public List<Stay> getStaysByDateRange(String fromDateStr, String toDateStr) {
        Map<String, Date> dateRange = DateUtils.getDateRange(fromDateStr, toDateStr);
        Date from = dateRange.get("from");
        Date to = dateRange.get("to");
        
        List<Stay> stays = stayRepository.findAllByDateRange(from, to);
        stays.forEach(stay -> stay.getPerson().hashCode());
        
        return stays;
    }
}
