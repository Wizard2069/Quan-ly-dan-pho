package com.company.qldp.elasticsearchservice.domain.repository;

import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;
import reactor.core.publisher.Flux;

public interface PeopleSearchRepository extends ReactiveElasticsearchRepository<PeopleSearch, Integer> {
    
    @Query(
        "{" +
            "\"multi_match\": {" +
                "\"query\": \"?0\", " +
                "\"type\": \"bool_prefix\", " +
                "\"fields\": [" +
                    "\"people_code.search\", " +
                    "\"people_code.search._2gram\", " +
                    "\"people_code.search._3gram\"" +
                "]" +
            "}" +
        "}"
    )
    Flux<PeopleSearch> findByPeopleCode(String peopleCode);
    
    @Query(
        "{" +
            "\"multi_match\": {" +
                "\"query\": \"?0\", " +
                "\"type\": \"bool_prefix\", " +
                "\"fields\": [" +
                    "\"full_name.search\", " +
                    "\"full_name.search._2gram\", " +
                    "\"full_name.search._3gram\"" +
                "]" +
            "}" +
        "}"
    )
    Flux<PeopleSearch> findByFullName(String fullName);
}
