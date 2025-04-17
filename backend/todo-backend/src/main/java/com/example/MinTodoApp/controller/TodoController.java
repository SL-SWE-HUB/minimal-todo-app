package com.example.MinTodoApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.example.MinTodoApp.model.User;
import com.example.MinTodoApp.service.TodoServiceImpl;
import com.example.MinTodoApp.service.UserService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoServiceImpl tds;
    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public List<Todo> getAllTodos(){
        return tds.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id){
        return new Todo();
    }

    @GetMapping("/userTodos/{userId}")
    public List<Todo> getTodosByUserId(@PathVariable Long userId){
        return tds.getTodosByUserId(userId);
    }

    @PostMapping("/newtodo")
    public Todo newTodo(@RequestBody Todo todo){
        return tds.newTodo(todo.getId(), todo);
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

    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){ 
        User currUser = getCurrentUser();
        if(currUser == null){
            System.out.println("Backend TodoController /create, current user was not found in createTodo function: " + currUser);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        todo.setUser(currUser); 
        currUser.addTodo(todo); 
        Todo savedTodo = tds.createTodo(todo); 
        return ResponseEntity.ok(savedTodo);
    }

    private User getCurrentUser() { 
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // returning null context 
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            System.out.println("No authenticated user found, returning null.");
            return null;
        }
        String username = authentication.getName();
        return userService.findByUsername(username);
    }

    @GetMapping("/user/{userId}") 
    public ResponseEntity<List<Todo>> getTodosByUser(@PathVariable Long userId){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<Todo> todos = tds.getTodosByUserId(userId); 
        return ResponseEntity.ok(todos);
    }
}
