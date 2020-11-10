package com.company.qldp.oauth.main.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = {
    "com.company.qldp.userservice",
    "com.company.qldp.domain"
})
@EnableJpaRepositories(basePackages = {
    "com.company.qldp.userservice"
})
@Import({SecurityConfig.class})
public class ResourceServerConfiguration {
}
