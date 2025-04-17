import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import {createTodo, updateTodo, deleteTodo, loadUserTodos} from './api/TodoService';
import Login from './components/Login';
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

function App() {

  const[todos, setTodos] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate(); 
  const [usr, setUser] = useState(null);

  useEffect(() => {
    if (userStatus === 'authenticated' && usr && usr.id) {
      loadTodos();
    } else if (userStatus === 'guest') {
      setTodos([]);
    }
    console.log("After useEffect() process for user state: ", usr);
  }, [userStatus, usr]);


  const loadTodos = async() => {
    try{
      if(!usr || !usr.id){
        console.warn("No user or user id available, setting todos to empty");
        setTodos([]);
        return;
      }
      const response = await loadUserTodos(usr.id);
      const data = await response.json(); 
      setTodos(data); 
    } catch (error) {
      console.error("Error in loadTodos:", error);
    }
  };

  const handleAddTodo = async (todo) => { 
    if(userStatus === 'authenticated')
    try {
      const newTodo = await createTodo(todo); 
      
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todos: ", error);
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

  const handleLogout = () => {
    setUserStatus(null); 
    navigate('/login');
  };

  return (
      <div className="App" style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
          <nav>
            {userStatus === 'authenticated' ? (
              <>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link> |{" "}
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </nav>
          <Routes>
            <Route
              path="/login"
              element={<Login setUserStatus={setUserStatus} setUser={setUser}/>}/>
            <Route 
              path="/signup" 
              element={<Signup setUserStatus={setUserStatus}/>}/>
            <Route 
              path="/home" 
              element={
                userStatus ? (
                  <>
                    <h1>Home - {userStatus === 'authenticated' ? 'User' : 'Guest'}</h1>
                    <TodoForm onAdd={handleAddTodo} />
                    <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
                  </>
                ) : (
                  // Not found, redirect to /login for now
                  <Navigate to="/login"/>
                )
              }
            />
            {/*default route redirtect -> login*/}
            <Route path="*" element ={<Navigate to="/login" />} />
          </Routes>
      </div>
  );

}

export default App;
