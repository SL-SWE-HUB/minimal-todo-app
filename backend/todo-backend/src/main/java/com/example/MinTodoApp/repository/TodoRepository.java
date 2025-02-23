package com.example.MinTodoApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MinTodoApp.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{

}
