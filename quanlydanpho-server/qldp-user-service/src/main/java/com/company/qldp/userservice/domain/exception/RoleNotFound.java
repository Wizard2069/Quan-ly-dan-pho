package com.company.qldp.userservice.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class RoleNotFound extends RuntimeException {
    
    public RoleNotFound() {
        super("Could not find given role");
    }
}
