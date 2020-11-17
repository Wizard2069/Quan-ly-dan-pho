package com.company.qldp.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class HouseholdPeopleId implements Serializable {

    private Integer householdId;
    private Integer peopleId;
}
