import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import {getTodos, createTodo, updateTodo, deleteTodo} from './api/TodoService';


/**
 * App component
 * - Manages list of to-dos
 * - Loads todos when component mounts
 * - Provides callback functions for adding, updating, and deleting todos
 */

function App() {

  const[todos, setTodos] = useState([]);

  useEffect(() => { 
    loadTodos();
  }, []);


  const loadTodos = async() => {
    try{
    const data = await getTodos();
    setTodos(data);
    }catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      console.log("New todo from API:", newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todos:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if(!todoToUpdate)
        return;
    const updatedTodo = {...todoToUpdate, completed: !todoToUpdate.completed};
    try{
      const newTodo = await updateTodo(id, updatedTodo);

      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? newTodo : todo))
    );
    }catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try{
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">

      <h1 className="title-style">Minimal To-Do App</h1>

      <section className="form-section">
        <h3>Enter Todo Task</h3>
        <TodoForm onAdd={handleAddTodo} />
      </section>

      <section className="todo-list-section">
        <h3>To-Do List</h3>
        <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
      </section>

    </div>
  );

}

export default App;
