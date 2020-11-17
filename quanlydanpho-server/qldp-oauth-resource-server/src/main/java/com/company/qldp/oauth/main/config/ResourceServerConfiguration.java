package com.company.qldp.oauth.main.config;

import com.company.qldp.householdservice.main.HouseholdServiceConfiguration;
import com.company.qldp.oauth.main.properties.ResourceServerProperties;
import com.company.qldp.peopleservice.main.PeopleServiceConfiguration;
import com.company.qldp.userservice.main.UserServiceConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableConfigurationProperties({ResourceServerProperties.class})
@ComponentScan(basePackages = {
    "com.company.qldp"
})
@EnableJpaRepositories(basePackages = {
    "com.company.qldp"
})
@Import({
    SecurityConfig.class,
    UserServiceConfiguration.class,
    HouseholdServiceConfiguration.class,
    PeopleServiceConfiguration.class
})
public class ResourceServerConfiguration {
}
