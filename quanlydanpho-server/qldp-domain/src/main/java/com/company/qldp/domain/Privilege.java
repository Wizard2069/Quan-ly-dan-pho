package com.company.qldp.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Entity
@Table(name = "privileges")
@Access(AccessType.FIELD)
public class Privilege {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    @Column(name = "name")
    private String name;
    
    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;
}
