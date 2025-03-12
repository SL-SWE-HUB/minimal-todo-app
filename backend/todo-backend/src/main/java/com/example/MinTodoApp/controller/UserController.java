package com.example.MinTodoApp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MinTodoApp.model.User;
import com.example.MinTodoApp.service.UserService;

@RestController
@RequestMapping("/todo")
public class UserController {

    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    //Example login endpoint
    @PostMapping("/login")
    public User login(@RequestBody User user){
        User existingUser = userService.findByUserName(user.getUsername());
        // System.out.println("Found User: " + (existingUser != null ? "true" : "false"));
        if(existingUser != null && existingUser.getPassword().equals(user.getPassword()))
            return existingUser;
        else
            return null;
    }
}
