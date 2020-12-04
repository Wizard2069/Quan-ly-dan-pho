package com.company.qldp.peopleservice.domain.service;

import com.company.qldp.common.DateInterval;
import com.company.qldp.common.util.RandomCodeGenerator;
import com.company.qldp.domain.People;
import com.company.qldp.domain.PersonalMobilization;
import com.company.qldp.domain.Stay;
import com.company.qldp.domain.TempAbsent;
import com.company.qldp.peopleservice.domain.dto.StayDto;
import com.company.qldp.peopleservice.domain.dto.TempAbsentDto;
import com.company.qldp.peopleservice.domain.exception.PersonNotFoundException;
import com.company.qldp.peopleservice.domain.repository.IDCardRepository;
import com.company.qldp.peopleservice.domain.repository.PeopleRepository;
import com.company.qldp.peopleservice.domain.repository.StayRepository;
import com.company.qldp.peopleservice.domain.repository.TempAbsentRepository;
import com.company.qldp.peopleservice.domain.util.CreateDateInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MobilizationService {
    
    private PeopleRepository peopleRepository;
    private TempAbsentRepository tempAbsentRepository;
    private StayRepository stayRepository;
    private IDCardRepository idCardRepository;
    
    @Autowired
    public MobilizationService(
        PeopleRepository peopleRepository,
        TempAbsentRepository tempAbsentRepository,
        StayRepository stayRepository,
        IDCardRepository idCardRepository
    ) {
        this.peopleRepository = peopleRepository;
        this.tempAbsentRepository = tempAbsentRepository;
        this.stayRepository = stayRepository;
        this.idCardRepository = idCardRepository;
    }
    
    public TempAbsent createTempAbsent(TempAbsentDto tempAbsentDto) {
        People people = idCardRepository.findByIdCardNumber(tempAbsentDto.getIdCardNumber())
            .getPerson();
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
    
        DateInterval interval = CreateDateInterval.create(
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
        People people = idCardRepository.findByIdCardNumber(stayDto.getIdCardNumber())
            .getPerson();
        
        if (people == null) {
            throw new PersonNotFoundException();
        }
    
        DateInterval interval = CreateDateInterval.create(
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
}
