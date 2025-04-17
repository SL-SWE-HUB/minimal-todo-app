package com.example.MinTodoApp.service;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.MinTodoApp.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{ // UserDetailsService interface that tells spring security how to load user data
    
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    // UserDetails -> A Spring security interface that representst the authenticated user 
    // Mapping our application's user entity to UserDetails 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        com.example.MinTodoApp.model.User appUser = userRepository.findByUsername(username); // **
        if(appUser == null){
            throw new UsernameNotFoundException("User not found with that username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), Collections.emptyList()); //**
    }
}
