package com.company.qldp.elasticsearchservice.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.hateoas.server.core.Relation;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Document(indexName = "id_card")
@Relation(collectionRelation = "idCards")
public class IDCardSearch {
    
    @Id
    private Integer id;
    
    @Field(type = FieldType.Nested, includeInParent = true)
    private PeopleSearch peopleSearch;
    
    @MultiField(
        mainField = @Field(name = "id_card_number", type = FieldType.Text),
        otherFields = {
            @InnerField(suffix = "keyword", type = FieldType.Keyword),
            @InnerField(suffix = "search", type = FieldType.Search_As_You_Type)
        }
    )
    private String idCardNumber;
    
    @Field(name = "issued_day", format = DateFormat.custom, pattern = "yyyy-MM-dd")
    private Date issuedDay;
    
    @Field(name = "issued_place")
    private String issuedPlace;
}
