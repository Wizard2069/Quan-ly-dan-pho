package com.company.qldp.elasticsearchservice.domain.repository;

import com.company.qldp.common.util.DateUtils;
import com.company.qldp.common.util.ReactiveUtils;
import com.company.qldp.common.util.SexUtils;
import com.company.qldp.elasticsearchservice.domain.entity.IDCardSearch;
import com.company.qldp.elasticsearchservice.domain.entity.PeopleSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ReactiveElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;
import reactor.core.publisher.Flux;

import static org.elasticsearch.index.query.QueryBuilders.*;
import static org.elasticsearch.index.query.MultiMatchQueryBuilder.*;

@Repository
public class CustomPeopleSearchRepositoryImpl implements CustomPeopleSearchRepository {
    
    private ReactiveElasticsearchOperations operations;
    
    @Autowired
    public CustomPeopleSearchRepositoryImpl(ReactiveElasticsearchOperations operations) {
        this.operations = operations;
    }
    
    @Override
    public Flux<PeopleSearch> findAllByFilters(MultiValueMap<String, String> queryParams) {
        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
        
        String name = queryParams.getFirst("name");
        String code = queryParams.getFirst("code");
        String idCard = queryParams.getFirst("id-card");
        String ageRange = queryParams.getFirst("age");
        String sex = queryParams.getFirst("sex");
        String dateRange = queryParams.getFirst("date");
        String status = queryParams.getFirst("status");
        
        if (name != null) {
            queryBuilder = queryBuilder.withQuery(
                multiMatchQuery(name, "full_name", "full_name.search", "full_name.search._2gram", "full_name.search._3gram")
                    .type(Type.BOOL_PREFIX).minimumShouldMatch("100%")
            );
        }
        if (code != null) {
            queryBuilder = queryBuilder.withQuery(
                multiMatchQuery(code, "people_code.search", "people_code.search._2gram", "people_code.search._3gram")
                .type(Type.BOOL_PREFIX)
            );
        }
        if (ageRange != null) {
            String[] ageRangeArr = ageRange.split(",");
            Integer fromAge = Integer.parseInt(ageRangeArr[0]);
            Integer toAge = Integer.parseInt(ageRangeArr[1]);
            int highYear = DateUtils.getBirthYear(fromAge);
            int lowYear = DateUtils.getBirthYear(toAge);
            
            queryBuilder = queryBuilder.withFilter(
                rangeQuery("birthday").from(lowYear + "||/y").to(highYear + "||/y").format("yyyy")
            );
        }
        if (sex != null) {
            queryBuilder = queryBuilder.withQuery(
                matchQuery("sex", SexUtils.getSex(sex))
            );
        }
        if (dateRange != null) {
            String[] dateRangeArr = dateRange.split(",");
            String fromDate = dateRangeArr[0];
            String toDate = dateRangeArr[1];
            
            if (status == null) {
                status = "arrival";
            }
            
            if (status.equals("arrival")) {
                queryBuilder = queryBuilder.withQuery(
                    rangeQuery("arrival_date").from(fromDate).to(toDate).format("yyyy-MM-dd")
                );
            }
            if (status.equals("leave")) {
                queryBuilder = queryBuilder.withQuery(
                    rangeQuery("leave_date").from(fromDate).to(toDate).format("yyyy-MM-dd")
                );
            }
        }
        
        Flux<PeopleSearch> peopleSearchFlux = operations.search(queryBuilder.build(), PeopleSearch.class)
            .map(SearchHit::getContent);
        
        if (idCard != null) {
            NativeSearchQueryBuilder idCardQueryBuilder = new NativeSearchQueryBuilder();
            idCardQueryBuilder = idCardQueryBuilder.withQuery(
                multiMatchQuery(idCard, "id_card_number.search", "id_card_number.search._2gram", "id_card_number.search._3gram")
                    .type(Type.BOOL_PREFIX)
            );
            
            Flux<PeopleSearch> idCardSearchFlux = operations.search(idCardQueryBuilder.build(), IDCardSearch.class)
                .map(SearchHit::getContent)
                .map(IDCardSearch::getPeopleSearch);
            
            peopleSearchFlux = ReactiveUtils.intersect(peopleSearchFlux, idCardSearchFlux);
        }
        
        return peopleSearchFlux;
    }
}
