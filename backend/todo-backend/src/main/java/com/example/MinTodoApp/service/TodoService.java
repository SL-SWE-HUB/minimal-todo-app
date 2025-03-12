package com.example.MinTodoApp.service;

import java.util.List;
import java.util.Optional;

import com.example.MinTodoApp.model.Todo;

public interface TodoService {

    List<Todo> getAllTodos();

    Todo createTodo(long id, Todo todo);

    Optional<Todo> updateTodo(Long id, Todo updatedTodo);

    void deleteTodo(Long id);

    Optional<Todo> getTodoById(Long id);

}
