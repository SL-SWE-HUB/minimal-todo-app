package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.MinTodoApp.model.Todo;

public class TodoService {

    public static List<Todo> getAllTodos(){
        return new ArrayList<>();
    }

    public static Todo createTodo(long id, Todo updatedTodo){
        return new Todo();
    }

    public static Todo updateTodo(Long id, Todo updatedTodo){
        return new Todo();
    }

    public static void deleteTodo(Long id){
        
    }

    public static Optional<Todo> getTodoById(Long id){
        return null;
    }


}
