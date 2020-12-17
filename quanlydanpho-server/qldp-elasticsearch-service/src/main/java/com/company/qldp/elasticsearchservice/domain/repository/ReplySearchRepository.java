package com.company.qldp.elasticsearchservice.domain.repository;

import com.company.qldp.elasticsearchservice.domain.entity.ReplySearch;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;

public interface ReplySearchRepository
    extends ReactiveElasticsearchRepository<ReplySearch, Integer>, CustomReplySearchRepository {
    
}
