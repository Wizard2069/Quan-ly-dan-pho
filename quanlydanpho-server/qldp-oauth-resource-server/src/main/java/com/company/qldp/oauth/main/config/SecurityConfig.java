package com.company.qldp.oauth.main.config;

import com.company.qldp.oauth.domain.converter.KeycloakRealmRoleConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) throws Exception {
        http.cors()
                .and()
                    .authorizeExchange()
                        .pathMatchers(HttpMethod.POST, "/api/login")
                            .permitAll()
                        .pathMatchers(HttpMethod.PUT, "/api/reset-password")
                            .permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/admin/**")
                            .hasRole("admin")
                        .pathMatchers(HttpMethod.POST, "/api/admin/**")
                            .hasRole("admin")
                        .pathMatchers(HttpMethod.GET, "/api/manager/**")
                            .hasRole("manager")
                        .pathMatchers(HttpMethod.POST, "/api/manager/**")
                            .hasRole("manager")
                        .anyExchange()
                            .authenticated()
                .and()
                    .oauth2ResourceServer()
                        .jwt()
                            .jwtAuthenticationConverter(jwtConverter())
                .and()
                .and()
                    .csrf()
                        .requireCsrfProtectionMatcher(webExchangeMatcher());
        
        return http.build();
    }
    
    private Converter<Jwt, ? extends Mono<? extends AbstractAuthenticationToken>> jwtConverter() {
        ReactiveJwtAuthenticationConverter converter = new ReactiveJwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new KeycloakRealmRoleConverter());
        
        return converter;
    }
    
    private ServerWebExchangeMatcher webExchangeMatcher() {
        return new NegatedServerWebExchangeMatcher(
            ServerWebExchangeMatchers.pathMatchers("/api/**")
        );
    }
}
