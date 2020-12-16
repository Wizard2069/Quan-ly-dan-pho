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
import org.springframework.web.cors.CorsConfiguration;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
                    .authorizeExchange()
                        .pathMatchers(HttpMethod.POST, "/login")
                            .permitAll()
                        .pathMatchers(HttpMethod.PUT, "/reset-password")
                            .permitAll()
                        .pathMatchers(HttpMethod.GET, "/users/petitions/**")
                            .hasRole("user")
                        .pathMatchers(HttpMethod.GET, "/users/**")
                            .hasRole("admin")
                        .pathMatchers(HttpMethod.POST, "/users/**")
                            .hasRole("admin")
                        .pathMatchers(HttpMethod.GET, "/people/**")
                            .hasAnyRole("manager", "admin")
                        .pathMatchers(HttpMethod.POST, "/people/**")
                            .hasRole("manager")
                        .pathMatchers(HttpMethod.PATCH, "/people/**")
                            .hasRole("manager")
                        .pathMatchers(HttpMethod.POST, "/petitions")
                            .hasRole("user")
                        .pathMatchers(HttpMethod.GET, "/petitions/**")
                            .hasRole("manager")
                        .pathMatchers(HttpMethod.PATCH, "/petitions/**")
                            .hasRole("manager")
                        .pathMatchers(HttpMethod.DELETE, "/petitions/**")
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
            ServerWebExchangeMatchers.pathMatchers("/**")
        );
    }
}
