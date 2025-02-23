package com.example.MinTodoApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MinTodoApp.model.Todo;
import com.example.MinTodoApp.repository.TodoRepository;
@Service
public class TodoService {
    @Autowired
    private TodoRepository tdr;

    public List<Todo> getAllTodos(){
        return new ArrayList<>();
    }

    public Todo createTodo(long id, Todo todo){
        return tdr.save(todo);
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
