package com.company.qldp.elasticsearchservice.domain.service;

import com.company.qldp.elasticsearchservice.domain.entity.IDCardSearch;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import com.company.qldp.elasticsearchservice.domain.repository.IDCardSearchRepository;
import com.company.qldp.elasticsearchservice.domain.repository.PeopleSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class PeopleSearchService {
    
    private PeopleSearchRepository peopleSearchRepository;
    private IDCardSearchRepository idCardSearchRepository;
    
    @Autowired
    public PeopleSearchService(
        PeopleSearchRepository peopleSearchRepository,
        IDCardSearchRepository idCardSearchRepository
    ) {
        this.peopleSearchRepository = peopleSearchRepository;
        this.idCardSearchRepository = idCardSearchRepository;
    }
    
    public Flux<PeopleSearch> findAllPeople() {
        return peopleSearchRepository.findAll();
    }
    
    public Flux<PeopleSearch> findPeopleByCode(String peopleCode) {
        return peopleSearchRepository.findByPeopleCode(peopleCode);
    }
    
    public Flux<PeopleSearch> findPeopleByFullName(String name) {
        return peopleSearchRepository.findByFullName(name);
    }
    
    public Flux<PeopleSearch> findPeopleByIDCardNumber(String idCardNumber) {
        return idCardSearchRepository.findByIdCardNumber(idCardNumber)
            .map(IDCardSearch::getPeopleSearch);
    }
}
