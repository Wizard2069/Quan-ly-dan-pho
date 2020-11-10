package com.company.qldp.userservice.domain.exception;

public class RoleNotFound extends RuntimeException {
    
    public RoleNotFound() {
        super("Could not find given role");
    }
}
