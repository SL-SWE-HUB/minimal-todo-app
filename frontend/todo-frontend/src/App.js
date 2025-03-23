import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import {getTodos, createTodo, updateTodo, deleteTodo} from './api/TodoService';
import Login from './components/Login';
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

/**
 * App component
 * - Manages list of to-dos
 * - Loads todos when component mounts
 * - Provides callback functions for adding, updating, and deleting todos
 */

function App() {
  // [todos, setTodos] -> State for todos 
  const[todos, setTodos] = useState([]);
  // [userStatus,setUserStatus] -> For user Auth Status: 'authenticated', 'guest', 'null' 
  const [userStatus, setUserStatus] = useState(null);


  // Conditional useEffect() -> Only load todos from backend if user authenticated
  useEffect(() => { 
    if(userStatus === 'authenticated') // User authenticated -> loadTodos if any
      loadTodos();
    else if(userStatus === 'guest') // Guests initialize with empty array
      setTodos([]); 
  }, [userStatus]);


  const loadTodos = async() => {
    try{
    const data = await getTodos();
    setTodos(data);
    }catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleAddTodo = async (todo) => {
    if(userStatus === 'authenticated')
    try {
      const newTodo = await createTodo(todo);
      console.log("New todo from API:", newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todos:", error);
    }else if(userStatus === 'guest')
        setTodos(prev => [...prev, { ...todo, id: Date.now(), completed: false}])
  };

  const handleToggleTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if(!todoToUpdate)
        return;
    const updatedTodo = {...todoToUpdate, completed: !todoToUpdate.completed};
    if(userStatus === 'authenticated'){
      try{
        const newTodo = await updateTodo(id, updatedTodo);

        setTodos((prevTodos) => 
          prevTodos.map((todo) => (todo.id === id ? newTodo : todo)));
      }catch (error) {
        console.error("Error updating todo:", error);
      }
    } else if(userStatus === 'guest')
        setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDeleteTodo = async (id) => {
    if(userStatus === 'authenticated'){
      try{
        await deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }catch (error) {
        console.error("Error deleting todo:", error);
      }
    }else if(userStatus === 'guest')
        setTodos(prev => prev.filter(todo => todo.id  !== id));
  };

  return (
    <div className="App">

      <Router>
      <div className="App" style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
          <nav>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Sign Up</Link>
          </nav>

          <Routes>
            <Route
              path="/login"
              element={ <Login setUserStatus={setUserStatus}/>}/>
            <Route path="/signup" element={<Signup setUserStatus={setUserStatus} />} />
            <Route path="/home" 
            element={userStatus ? (
            <>
              <h1>Home - {userStatus === 'authenticated' ? 'User' : 'Guest'}</h1>
              <TodoForm onAdd={handleAddTodo} />
              <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
            </>
            ) : (
              // Not found, redirect to /login for now
              <Navigate to="/login"/>
            )}/>
              {/*default route redirtect -> login*/}
            <Route path="*" element ={<Navigate to="/login" />} />
          </Routes>

        </div>
      </Router>
    </div>
  );

}

export default App;
