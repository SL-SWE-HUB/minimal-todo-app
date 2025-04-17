package com.example.MinTodoApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MinTodoApp.model.Todo;
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{
    // Custom method to retrieve specific list of todos by user id
    List<Todo> findByUserId(Long userId);
}
