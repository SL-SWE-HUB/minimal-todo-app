package com.example.MinTodoApp.service;

import com.example.MinTodoApp.model.User;

public interface UserService {
    User registerUser(User user);
    User findByUsername(String username);
}
