import React, {useState, useEffect} from 'react';
import './App.css';
// Importing child components
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
//Importing API service functions we created (Handle HTTP requests)
import {getTodos, createTodo, updateTodo, deleteTodo} from './api/TodoService';


/**
 * App component
 * - Manages list of to-dos
 * - Loads todos when component mounts
 * - Provides callback functions for adding, updating, and deleting todos
 */

function App() {

  const[todos, setTodos] = useState([]);

  // useEffect hook: runs noce the coponent is mounted to oad existing todos
  useEffect(() => { 
    loadTodos();
  }, []);

  //Asynchronous function to load todos, wait for response and set it to data const variable
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
      //in try-catch block, attempt to call the API to create a new todo and retrieve it
      const newTodo = await createTodo(todo);
      console.log("New todo from API:", newTodo);
      //Updating state by appending new todo to existing list
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todos:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    // Check if it exists
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if(!todoToUpdate)
        return;
    //Creating an updated version of the todo with the completed flag toggled
    const updatedTodo = {...todoToUpdate, completed: !todoToUpdate.completed};
    try{
      //calling api with updated todo
      const newTodo = await updatedTodo(id, updatedTodo);
      //updating state by replacing the old todo with the updated one
      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id? newTodo : todo))
    );
    }catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    //Try-catch to check for id
    try{
      //Calling out api to delete the todo
      await deleteTodo(id);
      //Update state by filtering out the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  //The component renders a heading, the form to add new todos,
  //and the list o todos. It passes the callback functions as props

  return (
    <div className="App" style={{padding: '16px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Minimal To-Do App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </div>
  );

}

export default App;
