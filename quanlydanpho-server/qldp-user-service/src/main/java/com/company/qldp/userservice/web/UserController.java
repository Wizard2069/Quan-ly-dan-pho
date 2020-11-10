package com.company.qldp.userservice.web;

import com.company.qldp.domain.User;
import com.company.qldp.userservice.domain.dto.UserDto;
import com.company.qldp.userservice.domain.service.UserService;
import com.company.qldp.userservice.domain.util.CreateUserResponse;
import com.company.qldp.userservice.domain.util.GetUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(
    path = "/api/admin",
    produces = MediaType.APPLICATION_JSON_VALUE
)
public class UserController {
    
    private UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping(
        path = "/users",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public ResponseEntity<CreateUserResponse> createUser(@Valid UserDto userDto) {
        User user = userService.createUser(userDto);
        
        return new ResponseEntity<>(
                makeCreateUserResponse(user.getId()),
                HttpStatus.CREATED
        );
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
