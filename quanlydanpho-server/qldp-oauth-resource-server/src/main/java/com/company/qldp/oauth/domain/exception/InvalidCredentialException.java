package com.company.qldp.oauth.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class InvalidCredentialException extends RuntimeException {
    
    public InvalidCredentialException() {
        super("Invalid user credentials");
    }
}
