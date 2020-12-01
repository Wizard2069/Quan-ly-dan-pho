package com.company.qldp.peopleservice.domain.validation.idcard;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class IDCardConstraintValidator implements ConstraintValidator<ValidIDCard, String> {
    
    @Override
    public void initialize(ValidIDCard validIDCard) {
    
    }
    
    @Override
    public boolean isValid(String idCardNumber, ConstraintValidatorContext context) {
        return idCardNumber.matches("([01-96]{3})+([0-3])+([0-9]{8})\\b");
    }
}
