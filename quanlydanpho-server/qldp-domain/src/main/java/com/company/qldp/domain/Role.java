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
@Table(name = "roles")
@Access(AccessType.FIELD)
public class Role {

    @Id
    @GeneratedValue
    private Integer id;
    
    private String name;
    
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;
    
    @ManyToMany
    @JoinTable(
        name = "roles_privileges",
        joinColumns = @JoinColumn(
            name = "role_id",
            referencedColumnName = "id"
        ),
        inverseJoinColumns = @JoinColumn(
            name = "privilege_id",
            referencedColumnName = "id"
        )
    )
    private Collection<Privilege> privileges;
}
