package com.company.qldp.oauth.web;

import com.company.qldp.domain.User;
import com.company.qldp.oauth.domain.exception.InvalidCredentialException;
import com.company.qldp.oauth.domain.util.GetTokenResponse;
import com.company.qldp.oauth.domain.util.LoginRequest;
import com.company.qldp.oauth.domain.util.LoginResponse;
import com.company.qldp.userservice.domain.exception.UnknownException;
import com.company.qldp.userservice.domain.exception.UserNotFoundException;
import com.company.qldp.userservice.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/api",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class AuthController {
    
    private UserService userService;
    
    private WebClient webClient;
    
    @Autowired
    public AuthController(UserService userService, WebClient webClient) {
        this.userService = userService;
        this.webClient = webClient;
    }
    
    @PostMapping(
        path = "/login",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<LoginResponse>> login(@Valid LoginRequest loginRequest) {
        User user = userService.findUserByEmail(loginRequest.getEmail());
        
        if (user == null) {
            return Mono.error(new UserNotFoundException());
        }
        
        MultiValueMap<String, String> loginForm = new LinkedMultiValueMap<>();
        loginForm.add("grant_type", "password");
        loginForm.add("client_id", "qldp-resource-server");
        loginForm.add("client_secret", "22ece3af-c38e-4eb1-9481-5530ddd37694");
        loginForm.add("username", user.getUsername());
        loginForm.add("password", loginRequest.getPassword());
        
        return webClient.post()
            .uri("/realms/master/protocol/openid-connect/token")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue(loginForm)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, (ex) -> {
                if (ex.rawStatusCode() == 401) {
                    return Mono.error(new InvalidCredentialException());
                }
                
                return Mono.error(new UnknownException(ex.toString()));
            })
            .bodyToMono(GetTokenResponse.class)
            .flatMap(tokenResponse -> {
                LoginResponse response = LoginResponse.builder()
                    .accessToken(tokenResponse.getAccessToken())
                    .expiresIn(tokenResponse.getExpiresIn())
                    .refreshToken(tokenResponse.getRefreshToken())
                    .build();
                
                return Mono.just(new ResponseEntity<>(response, HttpStatus.OK));
            });
    }
}
