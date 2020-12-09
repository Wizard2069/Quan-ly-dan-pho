package com.company.qldp.elasticsearchservice.domain.repository;

import com.company.qldp.elasticsearchservice.domain.entity.HouseholdSearch;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;
import reactor.core.publisher.Flux;

public interface HouseholdSearchRepository extends ReactiveElasticsearchRepository<HouseholdSearch, Integer> {
    
    @Query(
        "{" +
            "\"multi_match\": {" +
                "\"query\": \"?0\", " +
                "\"type\": \"bool_prefix\", " +
                "\"fields\": [" +
                    "\"host.full_name\", " +
                    "\"host.full_name.search\", " +
                    "\"host.full_name.search._2gram\", " +
                    "\"host.full_name.search._3gram\"" +
                "]" +
            "}" +
        "}"
    )
    Flux<HouseholdSearch> findByHostFullName(String name);
    
    @Query(
        "{" +
            "\"multi_match\": {" +
                "\"query\": \"?0\", " +
                    "\"type\": \"bool_prefix\", " +
                    "\"fields\": [" +
                        "\"address\", " +
                        "\"address.search\", " +
                        "\"address.search._2gram\", " +
                        "\"address.search._3gram\"" +
                "]" +
            "}" +
        "}"
    )
    Flux<HouseholdSearch> findByAddress(String address);
}
