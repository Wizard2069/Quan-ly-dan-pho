package com.company.qldp.elasticsearchservice.domain.entity;

import com.company.qldp.common.PeopleInfo;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.hateoas.server.core.Relation;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Document(indexName = "people")
@Relation(collectionRelation = "people")
public class PeopleSearch {
    
    @Id
    private Integer id;
    
    @MultiField(
        mainField = @Field(name = "people_code", type = FieldType.Text),
        otherFields = {
            @InnerField(suffix = "keyword", type = FieldType.Keyword),
            @InnerField(suffix = "search", type = FieldType.Search_As_You_Type)
        }
    )
    private String peopleCode;
    
    @MultiField(
        mainField = @Field(name = "full_name", type = FieldType.Text),
        otherFields = {
            @InnerField(suffix = "keyword", type = FieldType.Keyword),
            @InnerField(suffix = "search", type = FieldType.Search_As_You_Type)
        }
    )
    private String fullName;
    
    @Field(type = FieldType.Date, format = DateFormat.custom, pattern = "yyyy-MM-dd")
    private Date birthday;
    
    @Field(type = FieldType.Text)
    private PeopleInfo.Sex sex;
    
    private String job;
    
    @Field(name = "current_address")
    private String currentAddress;
    
    @Field(name = "passport_number")
    private String passportNumber;
    
    private String note;
}
