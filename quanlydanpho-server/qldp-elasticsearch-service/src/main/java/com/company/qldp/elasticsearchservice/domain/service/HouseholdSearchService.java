package com.company.qldp.elasticsearchservice.domain.service;

import com.company.qldp.elasticsearchservice.domain.entity.HouseholdSearch;
import com.company.qldp.elasticsearchservice.domain.repository.HouseholdSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class HouseholdSearchService {
    
    private HouseholdSearchRepository householdSearchRepository;
    
    @Autowired
    public HouseholdSearchService(HouseholdSearchRepository householdSearchRepository) {
        this.householdSearchRepository = householdSearchRepository;
    }
    
    public Flux<HouseholdSearch> getHouseholds() {
        return householdSearchRepository.findAll();
    }
    
    public Flux<HouseholdSearch> getHouseholdsByHostName(String name) {
        return householdSearchRepository.findByHostFullName(name);
    }
    
    public Flux<HouseholdSearch> getHouseholdsByAddress(String address) {
        return householdSearchRepository.findByAddress(address);
    }
}
