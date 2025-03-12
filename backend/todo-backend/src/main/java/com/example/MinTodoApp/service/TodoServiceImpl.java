package com.example.MinTodoApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MinTodoApp.model.Todo;
import com.example.MinTodoApp.repository.TodoRepository;

@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoRepository tdr;

    public List<Todo> getAllTodos(){
        return new ArrayList<>();
    }

    public Todo createTodo(long id, Todo todo){
        return tdr.save(todo);
    }

    public Optional<Todo> updateTodo(Long id, Todo updatedTodo){
        Todo toUpdate = tdr.getReferenceById(id);
        toUpdate.setTitle(updatedTodo.getTitle());
        toUpdate.setDescription(updatedTodo.getDescription());
        toUpdate.setCompleted(updatedTodo.isCompleted());
        return Optional.of(updatedTodo);
    }

    public void deleteTodo(Long id){
        if(id != null)
            tdr.deleteById(id);
    }

    public Optional<Todo> getTodoById(Long id){
        return tdr.findById(id);
    }
    
}
