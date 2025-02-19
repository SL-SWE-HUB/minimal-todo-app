package com.example.MinTodoApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class Todo {
    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String description;
    private boolean completed;
    
}
