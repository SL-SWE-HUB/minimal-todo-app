package com.example.MinTodoApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MinTodoApp.model.Todo;
import com.example.MinTodoApp.service.TodoServiceImpl;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoServiceImpl tds;
    
    @GetMapping("/")
    public List<Todo> getAllTodos(){
        return tds.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id){
        return new Todo();
    }

    @PostMapping("/newtodo")
    public Todo createTodo(@RequestBody Todo todo){
        return tds.createTodo(todo.getId(), todo);
    }

    @PutMapping("/updateTodo/{id}")
    public Optional<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo){
        if(id == null || todo == null)
            return null;
        return tds.updateTodo(id, todo);
    }

    @DeleteMapping("/deleteTodo/{id}")
    public void deleteTodo(@PathVariable Long id){
        tds.deleteTodo(id);
    }

}
