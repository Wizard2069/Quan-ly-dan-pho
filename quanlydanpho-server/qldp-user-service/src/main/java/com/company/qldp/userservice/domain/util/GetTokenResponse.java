package com.company.qldp.userservice.domain.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetTokenResponse {
    
    private String access_token;
    
    public String getAccessToken() {
        return this.access_token;
    }
}
