package com.example.MinTodoApp.service;

import org.springframework.stereotype.Service;

import com.example.MinTodoApp.model.User;
import com.example.MinTodoApp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user){
        // For production environment, hash the password before saving!
        return userRepository.save(user);
    }
    
    @Override
    public User findByUserName(String username){
        return userRepository.findByUsername(username);
    }
}
