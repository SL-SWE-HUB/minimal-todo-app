import { useState, useEffect } from 'react';
import { getTodos } from './api/todoService';

function TodoList(){
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTodos()
        .then(data => setTodos(data))
        .catch(err => setError(err.message));
    }, []);
}