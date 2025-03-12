import React, {useState} from 'react';
import {loginUser} from '../api/AuthService';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await loginUser({username, password});
            setMessage(`User ${result.username} logged in successfully!`);
        }catch(error){
            setMessage(`Log in attempt Failed. Try Again.`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default Login;