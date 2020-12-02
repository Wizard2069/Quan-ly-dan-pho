package com.company.qldp.peopleservice.domain.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateStoryResponse {

    private Integer id;
    private Integer personId;
    private Date from;
    private Date to;
    private String address;
    private String job;
    private String workplace;
}
