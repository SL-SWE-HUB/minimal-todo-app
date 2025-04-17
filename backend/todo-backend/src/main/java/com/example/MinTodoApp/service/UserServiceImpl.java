package com.example.MinTodoApp.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.MinTodoApp.model.User;
import com.example.MinTodoApp.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User registerUser(User user){
        // In a production environment, hash the password before saving
        return userRepository.save(user);
    }
    
    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username){
        User user = userRepository.findByUsername(username);
        return user;
    }
}
