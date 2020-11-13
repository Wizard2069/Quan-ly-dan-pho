package com.company.qldp.oauth.main.config;

import com.company.qldp.userservice.main.UserServiceConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ConfigurationPropertiesScan(basePackages = {"com.company.qldp"})
@ComponentScan(basePackages = {
    "com.company.qldp"
})
@EnableJpaRepositories(basePackages = {
    "com.company.qldp"
})
@Import({
    SecurityConfig.class,
    UserServiceConfiguration.class
})
public class ResourceServerConfiguration {
}
