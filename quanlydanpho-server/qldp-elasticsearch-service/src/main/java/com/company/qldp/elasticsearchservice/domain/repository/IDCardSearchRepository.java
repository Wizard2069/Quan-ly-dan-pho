package com.company.qldp.elasticsearchservice.domain.repository;

import com.company.qldp.elasticsearchservice.domain.entity.IDCardSearch;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;
import reactor.core.publisher.Flux;

public interface IDCardSearchRepository extends ReactiveElasticsearchRepository<IDCardSearch, Integer> {
    
    @Query(
        "{" +
            "\"multi_match\": {" +
                "\"query\": \"?0\", " +
                "\"type\": \"bool_prefix\", " +
                "\"fields\": [" +
                    "\"id_card_number.search\", " +
                    "\"id_card_number.search._2gram\", " +
                    "\"id_card_number.search._3gram\"" +
                "]" +
            "}" +
        "}"
    )
    Flux<IDCardSearch> findByIdCardNumber(String idCardNumber);
}
