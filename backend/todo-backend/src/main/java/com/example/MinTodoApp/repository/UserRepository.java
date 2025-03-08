package com.example.MinTodoApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MinTodoApp.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
}
