package com.example.MinTodoApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.MinTodoApp.model.Todo;
import com.example.MinTodoApp.model.User;
import com.example.MinTodoApp.repository.TodoRepository;
import com.example.MinTodoApp.repository.UserRepository;

@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoRepository tdr;
    @Autowired
    private UserRepository usrRepo;

    public List<Todo> getAllTodos(){
        return new ArrayList<>();
    }

    public Todo newTodo(long id, Todo todo){
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

    @Override
    @Transactional
    public Todo createTodo(Todo todo){
        return tdr.save(todo);
    }

    @Override // ** Deprecated method findById()
    @Transactional(readOnly = true) 
    public List<Todo> getTodosByUserId(Long userId){

        Optional<User> storedUser = usrRepo.findById(userId);

        if(!storedUser.isPresent())
            return null;

        List<Todo> todos = storedUser.get().getTodos();
        if(todos.size() < 1){ // Sample Todo when the List is empty 
            Todo testTodo = new Todo();
            testTodo.setTitle("TestTodo");
            testTodo.setDescription("Sample Todo Test");
            todos.add(testTodo);
        }

        return todos;
    } 
    
}
