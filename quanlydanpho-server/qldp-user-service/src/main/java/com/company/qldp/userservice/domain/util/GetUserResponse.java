package com.company.qldp.userservice.domain.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserResponse {
    
    private String message;
    
    private Integer id;
    private String username;
    private String email;
}
