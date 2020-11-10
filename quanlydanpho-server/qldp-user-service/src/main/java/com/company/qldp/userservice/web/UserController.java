package com.company.qldp.userservice.web;

import com.company.qldp.domain.Role;
import com.company.qldp.domain.User;
import com.company.qldp.userservice.domain.dto.GetRolesDto;
import com.company.qldp.userservice.domain.dto.KeycloakUserDto;
import com.company.qldp.userservice.domain.dto.UserDto;
import com.company.qldp.userservice.domain.service.UserService;
import com.company.qldp.userservice.domain.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(
    path = "/api/admin",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class UserController {
    
    private UserService userService;
    
    private WebClient webClient;
    
    @Autowired
    public UserController(UserService userService, WebClient webClient) {
        this.userService = userService;
        this.webClient = webClient;
    }
    
    @PostMapping(
        path = "/users",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<CreateUserResponse>> createUser(@Valid UserDto userDto) {
        User user = userService.createUser(userDto);
        
        List<CredentialRepresentation> credentials = new ArrayList<>();
        credentials.add(
            CredentialRepresentation
                .builder()
                .type("password")
                .value(userDto.getPassword())
                .build()
        );
        
        KeycloakUserDto keycloakUserDto = KeycloakUserDto.builder()
            .username(userDto.getUsername())
            .email(userDto.getEmail())
            .enabled(true)
            .credentials(credentials.toArray(CredentialRepresentation[]::new))
            .build();
        
        MultiValueMap<String, String> formData = makeLoginBody();
        formData.add("username", "admin");
        formData.add("password", "admin");
        
        return webClient.post()
            .uri("/realms/master/protocol/openid-connect/token")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue(formData)
            .retrieve()
            .bodyToMono(GetTokenResponse.class)
            .map(GetTokenResponse::getAccessToken)
            .flatMap(accessToken -> {
                if (accessToken == null) {
                    return Mono.error(new RuntimeException("Invalid access token"));
                }
                
                return webClient.post().uri("/admin/realms/master/users")
                    .header("Authorization", "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(keycloakUserDto)
                    .retrieve()
                    .toBodilessEntity()
                    .flatMap(responseEntity -> {
                        if (responseEntity.getStatusCodeValue() == 201 &&
                            responseEntity.getHeaders().getLocation() != null
                        ) {
                            String userId = responseEntity.getHeaders().getLocation()
                                .toString()
                                .replace("http://localhost:8081/auth/admin/realms/master/users/", "");
                            
                            return webClient.get()
                                .uri("/admin/realms/master/roles")
                                .header("Authorization", "Bearer " + accessToken)
                                .retrieve()
                                .bodyToMono(GetRolesDto[].class)
                                .flatMap(responses -> {
                                    String[] userRoles = user.getRoles()
                                        .stream()
                                        .map(Role::getName)
                                        .toArray(String[]::new);
                                    
                                    List<GetRolesDto> requestBody = new ArrayList<>();
                                    
                                    for (GetRolesDto response : responses) {
                                        for (String name : userRoles) {
                                            if (response.getName().equals(name)) {
                                                requestBody.add(
                                                    GetRolesDto
                                                        .builder()
                                                        .id(response.getId())
                                                        .name(response.getName())
                                                        .build()
                                                );
                                            }
                                        }
                                    }
                                    
                                    return webClient.post()
                                        .uri("/admin/realms/master/users/{id}/role-mappings/realm", userId)
                                        .header("Authorization", "Bearer " + accessToken)
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(requestBody.toArray())
                                        .retrieve()
                                        .toBodilessEntity()
                                        .flatMap(entity -> {
                                            if (entity.getStatusCodeValue() == 204) {
                                                return Mono.just(new ResponseEntity<>(
                                                    makeCreateUserResponse(user.getId()),
                                                    HttpStatus.CREATED
                                                ));
                                            }
                                            
                                            return Mono.just(new ResponseEntity<>(
                                                makeCreateUserResponse(-1),
                                                HttpStatus.BAD_REQUEST
                                            ));
                                        });
                                });
                        }
                        
                        return Mono
                            .error(new RuntimeException("An error occurred " + responseEntity.getStatusCodeValue()));
                    });
            });
    }
    
    private MultiValueMap<String, String> makeLoginBody() {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", "qldp-resource-server");
        formData.add("client_secret", "22ece3af-c38e-4eb1-9481-5530ddd37694");
        formData.add("grant_type", "password");
        
        return formData;
    }
    
    private CreateUserResponse makeCreateUserResponse(Integer id) {
        return new CreateUserResponse(id);
    }
    
    @GetMapping(path = "/users/{id}")
    public ResponseEntity<GetUserResponse> getUser(@PathVariable Integer id) {
        User user = userService.findUserById(id).get();
        
        return new ResponseEntity<>(
            makeGetUserResponse(user.getId(), user.getUsername(), user.getEmail()),
            HttpStatus.OK
        );
    }
    
    private GetUserResponse makeGetUserResponse(Integer id, String username, String email) {
        return new GetUserResponse("Success", id, username, email);
    }
}
