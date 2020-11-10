package com.company.qldp.userservice.domain.exception;

public class UserAlreadyExistException extends RuntimeException {
    
    private static final long serialVersionUID = 5861310537366287163L;
    
    public UserAlreadyExistException(String email) {
        super("User with email " + email + " already exists!");
    }
}
