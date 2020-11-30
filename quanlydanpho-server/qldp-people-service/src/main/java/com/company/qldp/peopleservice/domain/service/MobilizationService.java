package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.People;
import com.company.qldp.domain.PersonalMobilization;
import com.company.qldp.domain.Stay;
import com.company.qldp.domain.TempAbsent;
import com.company.qldp.peopleservice.domain.dto.StayDto;
import com.company.qldp.peopleservice.domain.dto.TempAbsentDto;
import com.company.qldp.peopleservice.domain.exception.InvalidDateRangeException;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.repository.StayRepository;
import com.company.qldp.peopleservice.domain.repository.TempAbsentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class MobilizationService {
    
    private PeopleRepository peopleRepository;
    private TempAbsentRepository tempAbsentRepository;
    private StayRepository stayRepository;
    
    @Autowired
    public MobilizationService(
        PeopleRepository peopleRepository,
        TempAbsentRepository tempAbsentRepository,
        StayRepository stayRepository
    ) {
        this.peopleRepository = peopleRepository;
        this.tempAbsentRepository = tempAbsentRepository;
        this.stayRepository = stayRepository;
    }
    
    public TempAbsent createTempAbsent(TempAbsentDto tempAbsentDto) {
        String peopleCode = tempAbsentDto.getPeopleCode();
        People people = peopleRepository.findByPeopleCode(peopleCode);
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
    
        DateInterval interval = createDateInterval(
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
    
    public Stay createStay(StayDto stayDto) {
        People people = peopleRepository.findByPeopleCode(stayDto.getPeopleCode());
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
    
        DateInterval interval = createDateInterval(
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
    
    private DateInterval createDateInterval(String fromDate, String toDate) {
        Date from = Date.from(Instant.parse(fromDate));
        Date to = Date.from(Instant.parse(toDate));
    
        if (to.before(from)) {
            throw new InvalidDateRangeException();
        }
    
        DateInterval interval = DateInterval.builder()
            .from(from).to(to)
            .build();
        
        return interval;
    }
}
