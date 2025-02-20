package com.example.MinTodoApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.MinTodoApp.model.Todo;
@Service
public class TodoService {

    public List<Todo> getAllTodos(){
        return new ArrayList<>();
    }

    public Todo createTodo(long id, Todo updatedTodo){
        return new Todo();
    }

    public Todo updateTodo(Long id, Todo updatedTodo){
        return new Todo();
    }

    public void deleteTodo(Long id){
        
    }

    public Optional<Todo> getTodoById(Long id){
        return null;
    }


}
