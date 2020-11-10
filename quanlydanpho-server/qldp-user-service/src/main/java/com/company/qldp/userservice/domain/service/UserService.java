package com.company.qldp.userservice.domain.service;

import com.company.qldp.domain.User;
import com.company.qldp.userservice.domain.dto.UserDto;
import com.company.qldp.userservice.domain.exception.UserAlreadyExistException;
import com.company.qldp.userservice.domain.repository.RoleRepository;
import com.company.qldp.userservice.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User createUser(UserDto userDto) {
        if (emailExists(userDto.getEmail())) {
            throw new UserAlreadyExistException(userDto.getEmail());
        }
        
        User user = User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .roles(Collections.singletonList(roleRepository.findByName("ROLE_USER")))
                .build();
        
        return userRepository.save(user);
    }
    
    private boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findUserById(Integer id) {
        return userRepository.findById(id);
    }
}
